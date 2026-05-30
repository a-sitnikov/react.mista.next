"use client";

import { useCallback, useState, type FC } from "react";

const applyTheme = (isDarkTheme: boolean) => {
  const root = document.documentElement;
  if (isDarkTheme) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

const persistThemeWithNext = async (isDarkTheme: boolean) => {
  try {
    await fetch("/api/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme: isDarkTheme ? "dark" : "light" }),
      cache: "no-store",
    });
  } catch {
    // ignore persistence failures
  }
};

interface ThemeSwitcherProps {
  isDarkTheme: boolean;
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  isDarkTheme,
  className,
}) => {
  const [, setIsDarkTheme] = useState<boolean>(isDarkTheme);

  const handleToggle = useCallback(() => {
    setIsDarkTheme(!isDarkTheme);
    applyTheme(!isDarkTheme);
    void persistThemeWithNext(!isDarkTheme);
  }, [isDarkTheme]);

  return (
    <button type="button" onClick={handleToggle} className={className}>
      {isDarkTheme ? "Светлая тема" : "Темная тема"}
    </button>
  );
};
