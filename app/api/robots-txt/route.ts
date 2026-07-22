import { NextRequest, NextResponse } from "next/server";
import { withApiMiddleware } from "@/middleware/api-middleware";

/**
 * Fetches a site's /robots.txt so the validator can lint a live file.
 *
 * This is a server-side fetch of a user-supplied host, so it is an SSRF sink.
 * The guards below are the point of the route, not incidental to it:
 *  - only http/https, and the path is forced to /robots.txt at the origin root,
 *    so the caller cannot aim it at an arbitrary endpoint;
 *  - hosts that resolve to loopback, link-local or RFC 1918 space are refused
 *    by literal check, and redirects are not followed so a public host cannot
 *    bounce us inward;
 *  - the response is capped and the request is timed out.
 */

const MAX_BYTES = 512 * 1024;
const TIMEOUT_MS = 8000;

/** Literal addresses and names that must never be fetched. */
function isBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");

  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (host.endsWith(".internal") || host.endsWith(".local")) return true;

  // IPv6 loopback and unique-local / link-local ranges.
  if (host === "::1" || host === "::") return true;
  if (/^f[cd][0-9a-f]{2}:/i.test(host)) return true;
  if (/^fe80:/i.test(host)) return true;
  // IPv4-mapped IPv6, e.g. ::ffff:127.0.0.1
  const mapped = host.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  const ipv4 = mapped ? mapped[1] : host;

  const octets = ipv4.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!octets) return false; // a name; DNS rebinding is out of scope here

  const [a, b] = [Number(octets[1]), Number(octets[2])];
  if (a === 127 || a === 0 || a === 10) return true;
  if (a === 169 && b === 254) return true; // link-local, incl. cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // carrier-grade NAT
  if (a >= 224) return true; // multicast and reserved

  return false;
}

async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  let target: URL;
  try {
    const { url } = await req.json();
    if (typeof url !== "string" || !url.trim()) {
      return NextResponse.json({ error: "invalidUrl" }, { status: 400 });
    }
    // Accept a bare host by assuming https, then discard whatever path,
    // query or credentials came with it.
    const raw = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const parsed = new URL(raw);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return NextResponse.json({ error: "invalidUrl" }, { status: 400 });
    }
    if (parsed.username || parsed.password) {
      return NextResponse.json({ error: "invalidUrl" }, { status: 400 });
    }
    if (isBlockedHost(parsed.hostname)) {
      return NextResponse.json({ error: "blockedHost" }, { status: 400 });
    }

    target = new URL("/robots.txt", parsed.origin);
  } catch {
    return NextResponse.json({ error: "invalidUrl" }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(target, {
      signal: controller.signal,
      redirect: "manual",
      headers: { "User-Agent": "RocksDevToolsRobotsValidator/1.0" },
      cache: "no-store",
    });

    if (response.status >= 300 && response.status < 400) {
      return NextResponse.json({ error: "redirected" }, { status: 400 });
    }
    if (!response.ok) {
      return NextResponse.json(
        { error: "fetchFailed", status: response.status },
        { status: 400 },
      );
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: "tooLarge" }, { status: 400 });
    }

    return NextResponse.json({
      content: new TextDecoder().decode(buffer),
      url: target.toString(),
    });
  } catch {
    return NextResponse.json({ error: "fetchFailed" }, { status: 400 });
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  return withApiMiddleware(req, handler);
}
