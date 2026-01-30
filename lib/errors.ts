export class ToolError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: Record<string, any>,
  ) {
    super(message);
    this.name = "ToolError";
  }
}
