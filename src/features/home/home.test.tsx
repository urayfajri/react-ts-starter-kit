import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { AuthProvider, ThemeProvider } from "@/shared/contexts";
import HomePage from "./page";

function renderPage(ui: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <MemoryRouter>
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>,
  );
}

test("renders home hero", () => {
  renderPage(<HomePage />);
  expect(screen.getByRole("heading", { name: /build something/i })).toBeInTheDocument();
});
