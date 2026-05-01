import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { ThemeProvider, AuthProvider } from "@/shared/contexts";
import { queryClient } from "@/shared/libs/queryClient";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster richColors position="top-right" />
          {import.meta.env.DEV && (
            <ReactQueryDevtools
              buttonPosition="bottom-right"
              initialIsOpen={false}
            />
          )}
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
