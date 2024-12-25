import { NextRequest, NextResponse } from "next/server";
import { withApiMiddleware } from "@/middleware/api-middleware";

const SYSTEM_PROMPT = `As an SQL Schema Generator Assistant, your task is to convert valid programming code class definitions into SQL table schemas and return the response in JSON format only.

Response Format:
{
    "language": "string",     // Detected programming language (Java, Python, TypeScript, etc)
    "type": "string",        // SQL type (MySQL or PostgreSQL)
    "output": "string",       // Complete SQL creation statement including all schemas, relationships, indexes, and constraints
    "title": "string"        // Title of the conversation
}

For invalid requests, respond with:
{
    "error": "I am a specialized code-to-SQL converter. I can only transform class definitions into SQL table schemas. Please provide a class definition for conversion."
}

Your responses must strictly return JSON format only, with no additional text or explanations outside the JSON structure.`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const messages: Message[] = body.messages || [];

    // Always include system prompt
    const fullMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://rocksdev.tools",
          "X-Title": "Rocks Dev Tools",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen-2-7b-instruct:free", // Fixed model
          messages: fullMessages,
          temperature: 0, // Fixed temperature for consistent outputs
          max_tokens: 2000,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to generate SQL");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("SQL Generation Error:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  return withApiMiddleware(req, handler);
}
