/**
 * Global Constants
 * App-wide constants and magic strings
 */

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: "Network error. Please check your connection.",
  SERVER: "Server error. Please try again later.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION: "Please check your input and try again.",
  UNKNOWN: "An unexpected error occurred.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: "Created successfully.",
  UPDATED: "Updated successfully.",
  DELETED: "Deleted successfully.",
  SAVED: "Saved successfully.",
} as const;

// Debounce/Throttle Delays (ms)
export const DELAYS = {
  DEBOUNCE_SEARCH: 300,
  DEBOUNCE_RESIZE: 250,
  THROTTLE_SCROLL: 100,
} as const;

// Animation Durations (ms)
export const DURATIONS = {
  FADE: 200,
  SLIDE: 300,
  MODAL: 400,
} as const;

/**
 * Usage Example:
 *
 * import { ERROR_MESSAGES, SUCCESS_MESSAGES, DELAYS } from "@/config/constants";
 *
 * // Error handling
 * if (response.status === HTTP_STATUS.NOT_FOUND) {
 *   showError(ERROR_MESSAGES.NOT_FOUND);
 * }
 *
 * // Success message
 * showSuccess(SUCCESS_MESSAGES.CREATED);
 *
 * // Debounce with constant
 * const debouncedSearch = debounce(handleSearch, DELAYS.DEBOUNCE_SEARCH);
 */
