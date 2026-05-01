import { describe, expect, it } from "vitest";
import { API_CONFIG } from "@/config";
import { createProduct, fetchProducts } from "@/features/products/api";
import { MOCK_PRODUCTS } from "@tests/msw/handlers";

describe("products api", () => {
  it("exports a products endpoint string", () => {
    expect(API_CONFIG.ENDPOINTS.PRODUCTS).toBeDefined();
    expect(typeof API_CONFIG.ENDPOINTS.PRODUCTS).toBe("string");
  });

  describe("HTTP (MSW)", () => {
    it("fetchProducts returns mocked list", async () => {
      const list = await fetchProducts();
      expect(list).toEqual(MOCK_PRODUCTS);
    });

    it("createProduct posts and returns entity", async () => {
      const created = await createProduct({ name: "From MSW" });
      expect(created.name).toBe("From MSW");
      expect(created.id.length).toBeGreaterThan(0);
    });
  });
});
