import { QueryProvider } from "./react-query";

export const AppProviders: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <QueryProvider>{children}</QueryProvider>;
};
