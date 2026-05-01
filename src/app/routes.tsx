import type { ReactNode } from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/app/AppLayout";
import { RouteFallback } from "@/app/RouteFallback";

const HomePage = lazy(() => import("@/features/home/page"));
const LoginPage = lazy(() => import("@/features/auth/LoginPage"));
const SignupPage = lazy(() => import("@/features/auth/SignupPage"));
const AppDashboardPage = lazy(() => import("@/features/app-dashboard/AppDashboardPage"));
const ProductsPage = lazy(() => import("@/features/products/page"));

function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  { path: "/", element: <LazyPage><HomePage /></LazyPage> },
  { path: "/login", element: <LazyPage><LoginPage /></LazyPage> },
  { path: "/signup", element: <LazyPage><SignupPage /></LazyPage> },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <LazyPage><AppDashboardPage /></LazyPage> },
      { path: "products", element: <LazyPage><ProductsPage embedded /></LazyPage> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
