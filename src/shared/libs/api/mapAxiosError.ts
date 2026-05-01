import axios from "axios";
import { HTTP_STATUS, ERROR_MESSAGES } from "@/config/constants";
import { AppError } from "@/shared/errors";

/**
 * Normalizes Axios/fetch failures into AppError for consistent UI and logging.
 */
export function mapUnknownToAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as { message?: string } | undefined;
    const serverMsg =
      typeof data?.message === "string" && data.message.trim() !== ""
        ? data.message
        : undefined;

    if (error.code === "ECONNABORTED" || error.message === "Network Error") {
      return new AppError(ERROR_MESSAGES.NETWORK, { code: error.code, status });
    }

    if (status === HTTP_STATUS.UNAUTHORIZED) {
      return new AppError(ERROR_MESSAGES.UNAUTHORIZED, { status, code: "UNAUTHORIZED" });
    }
    if (status === HTTP_STATUS.FORBIDDEN) {
      return new AppError(ERROR_MESSAGES.FORBIDDEN, { status, code: "FORBIDDEN" });
    }
    if (status === HTTP_STATUS.NOT_FOUND) {
      return new AppError(ERROR_MESSAGES.NOT_FOUND, { status, code: "NOT_FOUND" });
    }
    if (status === HTTP_STATUS.BAD_REQUEST || status === HTTP_STATUS.CONFLICT) {
      return new AppError(serverMsg ?? ERROR_MESSAGES.VALIDATION, {
        status,
        code: "CLIENT_ERROR",
        metadata: { data: error.response?.data },
      });
    }
    if (
      status !== undefined &&
      status >= HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
      return new AppError(serverMsg ?? ERROR_MESSAGES.SERVER, {
        status,
        code: "SERVER_ERROR",
      });
    }

    return new AppError(
      serverMsg ?? (error.message || ERROR_MESSAGES.UNKNOWN),
      {
        status,
        code: "HTTP_ERROR",
      },
    );
  }

  if (error instanceof Error) {
    return new AppError(error.message || ERROR_MESSAGES.UNKNOWN, {
      code: "ERROR",
    });
  }

  return new AppError(ERROR_MESSAGES.UNKNOWN, { code: "UNKNOWN" });
}
