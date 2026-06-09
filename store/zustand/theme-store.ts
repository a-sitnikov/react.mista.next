"use client";

import { updateThemeAction } from "@/app/api/actions/update-theme";
import { create } from "zustand";

interface IProps {
  initialTheme: string;
}

interface ThemeState {
  theme: string;
  setTheme: (theme: this["theme"]) => void;
  toggleTheme: () => void;
}

export const createThemeStore = ({ initialTheme }: IProps) =>
  create<ThemeState>((set, get) => ({
    theme: initialTheme,
    setTheme: (theme) => {
      if (get().theme === theme) return;

      set({ theme });

      // 2) Update <html> class
      const html = document.documentElement;
      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }

      // 3) Write cookie
      updateThemeAction(theme ?? "light");
    },
    toggleTheme: () => {
      const next = get().theme === "dark" ? "light" : "dark";
      get().setTheme(next);
    },
  }));

export type IThemeStore = ReturnType<typeof createThemeStore>;
