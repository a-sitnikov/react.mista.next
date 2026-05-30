"use client";
import { useCallback, useState, type FC } from "react";

type Theme = "dark" | "light";

const getSavedTheme = (): Theme => {
  if (typeof document === "undefined") {
    return "light";
  }

  const hasDarkClass = document.documentElement.classList.contains("dark");
  if (hasDarkClass) {
    return "dark";
  }

  const cookieMatch = document.cookie.match(
    /(?:^|; )theme=(dark|light)(?:;|$)/,
  );
  if (cookieMatch?.[1]) {
    return cookieMatch[1] as Theme;
  }

  return "light";
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

const persistThemeWithNext = async (theme: Theme) => {
  try {
    await fetch("/api/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme }),
      cache: "no-store",
    });
  } catch {
    // ignore persistence failures
  }
};

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const [theme, setTheme] = useState<Theme>(() => getSavedTheme());

  const handleToggle = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    void persistThemeWithNext(nextTheme);
  }, [theme]);

  return (
    <button type="button" onClick={handleToggle} className={className}>
      {theme === "dark" ? "Светлая тема" : "Темная тема"}
    </button>
  );
};
