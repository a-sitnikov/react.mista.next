"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: true,
      refetchOnWindowFocus: false,
      throwOnError: (error: Error) => {
        if (error) {
          console.log(error.message);
        }
        return false;
      },
    },
  },
});

export const QueryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
