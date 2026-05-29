import { QueryClient } from "@tanstack/react-query";

export * from "./use-sections";
export * from "./use-topics-list";

export default function getQueryClient() {
  return new QueryClient();
}
