// middleware/api-middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter with Redis
const ratelimit =
  process.env.REDIS_KV_REST_API_URL && process.env.REDIS_KV_REST_API_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.REDIS_KV_REST_API_URL,
          token: process.env.REDIS_KV_REST_API_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(10, "1m"), // 10 requests per minute
      })
    : null;

export async function withApiMiddleware(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
) {
  // Check origin
  const origin = request.headers.get("origin") || "";
  if (origin !== process.env.NEXT_PUBLIC_BASE_URL) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (ratelimit) {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`,
    );

    if (!success) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  return handler(request);
}
