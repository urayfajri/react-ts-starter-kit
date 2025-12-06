import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/features/home/page";
import ProductsPage from "@/features/products/page";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
]);
