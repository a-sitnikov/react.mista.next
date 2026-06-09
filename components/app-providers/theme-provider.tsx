"use client";

import { createThemeStore, IThemeStore } from "@/store/zustand/theme-store";
import { useContext, useState } from "react";
import { createContext } from "react";

interface IProps extends React.PropsWithChildren {
  initialTheme?: string;
}

export const ThemeContext = createContext<IThemeStore>({} as IThemeStore);

export const useThemeStore = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<IProps> = ({
  initialTheme = "light",
  children,
}) => {
  const [store] = useState(() => createThemeStore({ initialTheme }));

  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
};
