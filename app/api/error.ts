import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export function handleApiError(error: Error) {
  Sentry.captureException(error);

  return NextResponse.json(
    {
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    },
    { status: 500 },
  );
}
