import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/app/AppLayout";
import HomePage from "@/features/home/page";
import ProductsPage from "@/features/products/page";
import LoginPage from "@/features/auth/LoginPage";
import SignupPage from "@/features/auth/SignupPage";
import AppDashboardPage from "@/features/app-dashboard/AppDashboardPage";

export const router = createBrowserRouter([
  // Landing (intro to starter pack) – header with Login / Sign up
  { path: "/", element: <HomePage /> },

  // Auth
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },

  // App (after login) – sidebar layout, protected
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <AppDashboardPage /> },
      { path: "products", element: <ProductsPage embedded /> },
    ],
  },

  // Fallback
  { path: "*", element: <Navigate to="/" replace /> },
]);
