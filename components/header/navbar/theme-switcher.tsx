"use client";

import { useThemeStore } from "@/components/app-providers/theme-provider";
import { type FC } from "react";
import { useStore } from "zustand";

interface IProps {
  className?: string;
}

export const ThemeSwitcher: FC<IProps> = ({ className }) => {
  const themeStore = useThemeStore();
  const theme = useStore(themeStore, (s) => s.theme);
  const toggleTheme = useStore(themeStore, (s) => s.toggleTheme);

  return (
    <button type="button" onClick={toggleTheme} className={className}>
      {theme === "dark" ? "Светлая тема" : "Темная тема"}
    </button>
  );
};
