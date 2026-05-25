import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QueryKeys } from "./types";
import { ISection } from "@/mista-api/types";

export const useSections = <TError = Error, TData = ISection[]>(
  options?: Omit<
    UseQueryOptions<ISection[], TError, TData, [QueryKeys.Sections]>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [QueryKeys.Sections],
    queryFn: () => fetch("/api/sections").then((resp) => resp.json()),
    placeholderData: [],
    ...options,
  });
};
