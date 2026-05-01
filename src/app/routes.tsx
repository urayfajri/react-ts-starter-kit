import type { ReactNode } from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppShell from "@/app/AppShell";
import AppLayout from "@/app/AppLayout";
import { RouteFallback } from "@/app/RouteFallback";
import { RouteFeatureErrorBoundary } from "@/shared/errors";

const HomePage = lazy(() => import("@/features/home/page"));
const LoginPage = lazy(() => import("@/features/auth/LoginPage"));
const SignupPage = lazy(() => import("@/features/auth/SignupPage"));
const AppDashboardPage = lazy(() => import("@/features/app-dashboard/AppDashboardPage"));
const ProductsPage = lazy(() => import("@/features/products/page"));

function LazyPage({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <RouteFeatureErrorBoundary
        title={title ?? "This page failed to load"}
        hint="Try again, go back, or refresh if the problem continues."
      >
        {children}
      </RouteFeatureErrorBoundary>
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: (
          <LazyPage title={`Couldn't load the home page`}>
            <HomePage />
          </LazyPage>
        ),
      },
      {
        path: "/login",
        element: (
          <LazyPage title={`Couldn't load sign in`}>
            <LoginPage />
          </LazyPage>
        ),
      },
      {
        path: "/signup",
        element: (
          <LazyPage title={`Couldn't load sign up`}>
            <SignupPage />
          </LazyPage>
        ),
      },
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyPage title="Dashboard failed to load">
                <AppDashboardPage />
              </LazyPage>
            ),
          },
          {
            path: "products",
            element: (
              <LazyPage title={`Products couldn't load`}>
                <ProductsPage embedded />
              </LazyPage>
            ),
          },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
