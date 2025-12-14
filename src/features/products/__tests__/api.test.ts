import { describe, it, expect } from "vitest";
import { API_CONFIG } from "@/config";

describe("products api config", () => {
  it("exports a products endpoint", () => {
    expect(API_CONFIG.ENDPOINTS.PRODUCTS).toBeDefined();
    expect(typeof API_CONFIG.ENDPOINTS.PRODUCTS).toBe("string");
  });
});
