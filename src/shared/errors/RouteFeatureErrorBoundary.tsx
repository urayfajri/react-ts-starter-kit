import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

export function RouteFeatureErrorBoundary({
  children,
  title,
  hint,
}: {
  children: ReactNode;
  title?: string;
  hint?: string;
}) {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname + location.search} title={title} hint={hint}>
      {children}
    </ErrorBoundary>
  );
}
