/**
 * Application Configuration
 * App-wide settings and constants
 */

export const APP_CONFIG = {
  // App Info
  NAME: "React TS Starter Kit",
  VERSION: "1.0.0",
  DESCRIPTION: "Modern React + TypeScript starter with modular architecture",

  // Environment
  ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,

  // Features
  FEATURES: {
    DARK_MODE: true,
    AUTH: false,
    NOTIFICATIONS: true,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },

  // Validation
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_NAME_LENGTH: 100,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const;

/**
 * Usage Example:
 *
 * import { APP_CONFIG } from "@/config/app";
 *
 * // Check environment
 * if (APP_CONFIG.IS_DEV) {
 *   console.log("Development mode");
 * }
 *
 * // Check feature
 * if (APP_CONFIG.FEATURES.DARK_MODE) {
 *   // Enable dark mode
 * }
 *
 * // Use validation
 * const isValidEmail = APP_CONFIG.VALIDATION.EMAIL_REGEX.test(email);
 */
