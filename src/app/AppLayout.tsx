import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "@/guards";
import AppSidebar from "@/shared/components/layout/AppSidebar";

export default function AppLayout() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}
