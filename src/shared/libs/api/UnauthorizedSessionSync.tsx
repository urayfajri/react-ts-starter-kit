import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/shared/contexts";
import { ERROR_MESSAGES } from "@/config/constants";
import { setUnauthorizedHandler } from "./unauthorizedSession";

/**
 * Wires 401 responses from Axios to logout + UX. Must render under RouterProvider + AuthProvider.
 */
export function UnauthorizedSessionSync() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
      toast.warning(ERROR_MESSAGES.UNAUTHORIZED, {
        description: "Please sign in again.",
      });
      navigate("/login", { replace: true });
    });

    return () => {
      setUnauthorizedHandler(undefined);
    };
  }, [logout, navigate]);

  return null;
}
