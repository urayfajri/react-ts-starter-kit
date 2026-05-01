import { http, HttpResponse } from "msw";
import { API_CONFIG } from "@/config";
import type { CreateProductRequest, Product } from "@/types/product";

function apiHref(pathSegment: string): string {
  const base = API_CONFIG.BASE_URL.replace(/\/$/, "");
  return `${base}${pathSegment.startsWith("/") ? pathSegment : `/${pathSegment}`}`;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: "msw-1", name: "MSW Starter Product" },
];

export function createMockProduct(payload: CreateProductRequest): Product {
  const id =
    typeof globalThis.crypto !== "undefined" && "randomUUID" in globalThis.crypto
      ? globalThis.crypto.randomUUID()
      : `id-${Math.random().toString(36).slice(2, 11)}`;
  return {
    id,
    name: payload.name,
    createdAt: new Date().toISOString(),
  };
}

export const handlers = [
  http.get(apiHref(API_CONFIG.ENDPOINTS.PRODUCTS), () =>
    HttpResponse.json(MOCK_PRODUCTS),
  ),
  http.post(apiHref(API_CONFIG.ENDPOINTS.PRODUCTS), async ({ request }) => {
    const body = (await request.json()) as CreateProductRequest;
    return HttpResponse.json(createMockProduct(body), { status: 201 });
  }),
];
