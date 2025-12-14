import { describe, it, expect } from "vitest";
import { PRODUCT_LIMITS } from "@/features/products/constants";

describe("product constants", () => {
  it("has name length limits", () => {
    expect(PRODUCT_LIMITS.NAME_MIN_LENGTH).toBeGreaterThan(0);
    expect(PRODUCT_LIMITS.NAME_MAX_LENGTH).toBeGreaterThan(
      PRODUCT_LIMITS.NAME_MIN_LENGTH,
    );
  });
});
