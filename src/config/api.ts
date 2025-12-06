/**
 * API Configuration
 * Centralized API setup, endpoints, and constants
 */

export const API_CONFIG = {
  // Base URL
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",

  // Request timeout (ms)
  TIMEOUT: 30000,

  // API Endpoints
  ENDPOINTS: {
    // Products
    PRODUCTS: "/products",
    PRODUCT_DETAIL: (id: string) => `/products/${id}`,

    // Users
    USERS: "/users",
    USER_PROFILE: "/users/profile",

    // Auth
    AUTH_LOGIN: "/auth/login",
    AUTH_LOGOUT: "/auth/logout",
    AUTH_REGISTER: "/auth/register",
    AUTH_REFRESH: "/auth/refresh",
  },

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // ms
    BACKOFF: 1.5, // exponential backoff multiplier
  },

  // Cache configuration
  CACHE: {
    PRODUCTS: 1000 * 60 * 5, // 5 minutes
    USERS: 1000 * 60 * 10, // 10 minutes
  },
} as const;

/**
 * Usage Example:
 *
 * import { API_CONFIG } from "@/config/api";
 *
 * // Get endpoint
 * const endpoint = API_CONFIG.ENDPOINTS.PRODUCTS;
 * const productUrl = API_CONFIG.ENDPOINTS.PRODUCT_DETAIL("123");
 *
 * // Get timeout
 * const timeout = API_CONFIG.TIMEOUT;
 *
 * // Get cache duration
 * const cacheDuration = API_CONFIG.CACHE.PRODUCTS;
 */
