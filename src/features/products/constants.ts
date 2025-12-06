/**
 * Products Feature Constants
 * Type-safe, domain-specific constants for the Products feature
 */

// Product limits and constraints
export const PRODUCT_LIMITS = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  PRICE_MIN: 0,
  PRICE_MAX: 999999.99,
} as const;

// Product sort options
export const PRODUCT_SORT = {
  NEWEST: "newest",
  OLDEST: "oldest",
  NAME_ASC: "name-asc",
  NAME_DESC: "name-desc",
  PRICE_LOW: "price-low",
  PRICE_HIGH: "price-high",
} as const;

// Product status/state
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
  DRAFT: "draft",
} as const;

// Product filter options
export const PRODUCT_FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  INACTIVE: "inactive",
  RECENTLY_ADDED: "recently-added",
  BESTSELLER: "bestseller",
} as const;

// Pagination defaults
export const PRODUCT_PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100] as const,
} as const;

// API response messages specific to products
export const PRODUCT_MESSAGES = {
  FETCH_ERROR: "Failed to fetch products. Please try again.",
  CREATE_SUCCESS: "Product created successfully.",
  CREATE_ERROR: "Failed to create product. Please try again.",
  UPDATE_SUCCESS: "Product updated successfully.",
  UPDATE_ERROR: "Failed to update product. Please try again.",
  DELETE_SUCCESS: "Product deleted successfully.",
  DELETE_ERROR: "Failed to delete product. Please try again.",
  VALIDATION_ERROR: "Please check the product details and try again.",
  DUPLICATE_NAME: "A product with this name already exists.",
  NOT_FOUND: "Product not found.",
} as const;

// Cache duration for products (ms)
export const PRODUCT_CACHE = {
  LIST: 5 * 60 * 1000, // 5 minutes
  DETAIL: 10 * 60 * 1000, // 10 minutes
  SEARCH: 2 * 60 * 1000, // 2 minutes
} as const;

// Performance timeouts (ms)
export const PRODUCT_TIMEOUTS = {
  API_TIMEOUT: 30000, // 30 seconds
  DEBOUNCE_SEARCH: 300, // 300ms
  DEBOUNCE_FILTER: 500, // 500ms
} as const;

// UI/UX constants
export const PRODUCT_UI = {
  SKELETON_ROWS: 3, // Number of skeleton rows to show while loading
  MAX_ITEMS_PER_ROW: 4, // Grid layout items per row
  TOAST_DURATION: 3000, // Toast notification duration (ms)
} as const;

/**
 * Type-safe constant access examples:
 *
 * @example
 * // Form validation
 * import { PRODUCT_LIMITS, PRODUCT_MESSAGES } from "./constants";
 *
 * if (productName.length < PRODUCT_LIMITS.NAME_MIN_LENGTH) {
 *   throw new Error(PRODUCT_MESSAGES.VALIDATION_ERROR);
 * }
 *
 * @example
 * // Sorting/Filtering
 * import { PRODUCT_SORT, PRODUCT_PAGINATION } from "./constants";
 *
 * const sortOptions = Object.values(PRODUCT_SORT);
 * const pageSizes = PRODUCT_PAGINATION.PAGE_SIZE_OPTIONS;
 *
 * @example
 * // React Query cache configuration
 * import { PRODUCT_CACHE } from "./constants";
 *
 * queryClient.setQueryData(
 *   ["products"],
 *   data,
 *   { staleTime: PRODUCT_CACHE.LIST }
 * );
 *
 * @example
 * // Debounced search
 * import { useDebounce } from "@/shared/hooks";
 * import { PRODUCT_TIMEOUTS, PRODUCT_MESSAGES } from "./constants";
 *
 * const debouncedSearch = useDebounce(
 *   async (query: string) => {
 *     try {
 *       const results = await searchProducts(query);
 *       setResults(results);
 *     } catch (error) {
 *       showError(PRODUCT_MESSAGES.FETCH_ERROR);
 *     }
 *   },
 *   PRODUCT_TIMEOUTS.DEBOUNCE_SEARCH
 * );
 */

// Export type utilities for advanced typing
export type ProductSort = (typeof PRODUCT_SORT)[keyof typeof PRODUCT_SORT];
export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
export type ProductFilter = (typeof PRODUCT_FILTERS)[keyof typeof PRODUCT_FILTERS];
