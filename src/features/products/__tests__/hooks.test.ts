import { describe, it, expect } from "vitest";
import { useDebounce } from "@/shared/hooks";

describe("shared hooks exports", () => {
  it("exports useDebounce", () => {
    expect(typeof useDebounce).toBe("function");
  });
});
