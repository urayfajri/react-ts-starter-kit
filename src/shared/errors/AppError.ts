export class AppError extends Error {
  public code?: string | number;
  public status?: number;
  public metadata?: Record<string, any>;

  constructor(
    message: string,
    options?: { code?: string | number; status?: number; metadata?: Record<string, any> },
  ) {
    super(message);
    this.name = "AppError";
    this.code = options?.code;
    this.status = options?.status;
    this.metadata = options?.metadata;
  }
}

export default AppError;
