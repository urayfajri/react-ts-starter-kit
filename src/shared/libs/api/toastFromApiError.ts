import { toast } from "sonner";
import { AppError } from "@/shared/errors";
import { ERROR_MESSAGES } from "@/config/constants";
import { mapUnknownToAppError } from "./mapAxiosError";

/**
 * Sonner toast from any API failure (uses AppError mapping when needed).
 */
export function toastFromApiError(error: unknown): void {
  const err =
    error instanceof AppError ? error : mapUnknownToAppError(error);
  if (err.status === 401 || err.code === "UNAUTHORIZED") {
    return;
  }
  toast.error(err.message ?? ERROR_MESSAGES.UNKNOWN);
}
