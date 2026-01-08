import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QueryKeys } from "./types";
import { ITopicsListItem } from "@/app/api/topics-list/topics-list.schema";
import { useSearchParams } from "next/navigation";

export const useTopicsList = <TError = Error, TData = ITopicsListItem[]>(
  options?: Omit<
    UseQueryOptions<
      ITopicsListItem[],
      TError,
      TData,
      [QueryKeys.TopicsList, object]
    >,
    "queryKey" | "queryFn"
  >
) => {
  const searchParams = useSearchParams();

  return useQuery({
    queryKey: [QueryKeys.TopicsList, Object.fromEntries(searchParams)],
    queryFn: async () => {
      const resp = await fetch(`/api/topics-list?${searchParams.toString()}`);
      if (!resp.ok) {
        throw new Error(`${resp.status}: ${resp.statusText}`);
      }

      return resp.json() as Promise<ITopicsListItem[]>;
    },
    placeholderData: (previousData) => previousData ?? [],
    ...options,
  });
};
