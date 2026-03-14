import { create } from "zustand";

/**
 * Global UI state - use for layout/shell state (sidebar, modals) that multiple features need.
 * For feature-specific state, create stores under features/<feature>/stores/.
 */
type UiState = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
