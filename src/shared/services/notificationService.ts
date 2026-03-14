/**
 * Notification service - thin wrapper around sonner (toast).
 * Use this instead of importing toast from "sonner" directly for easier testing and swapping.
 */
import { toast as sonnerToast } from "sonner";

export const notificationService = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, { description });
  },
  error: (message: string, description?: string) => {
    sonnerToast.error(message, { description });
  },
  promise: <T,>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) => {
    return sonnerToast.promise(promise, messages);
  },
  dismiss: (id?: string | number) => {
    sonnerToast.dismiss(id);
  },
} as const;
