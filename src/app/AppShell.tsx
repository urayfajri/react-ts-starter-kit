import { Outlet } from "react-router-dom";
import { UnauthorizedSessionSync } from "@/shared/libs/api/UnauthorizedSessionSync";

export default function AppShell() {
  return (
    <>
      <UnauthorizedSessionSync />
      <Outlet />
    </>
  );
}
