import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "@/guards";
import AppSidebar from "@/shared/components/layout/AppSidebar";
import { RouteFeatureErrorBoundary } from "@/shared/errors";

export default function AppLayout() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <RouteFeatureErrorBoundary
            title="This app section crashed"
            hint="Try again or reload. Your session is unchanged unless you sign out."
          >
            <Outlet />
          </RouteFeatureErrorBoundary>
        </main>
      </div>
    </ProtectedRoute>
  );
}
