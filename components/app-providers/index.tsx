import { QueryProvider } from "./react-query";
import { ThemeProvider } from "./theme-provider";

interface IProps extends React.PropsWithChildren {
  theme?: string;
}

export const AppProviders: React.FC<IProps> = ({ theme, children }) => {
  return (
    <QueryProvider>
      <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
    </QueryProvider>
  );
};
