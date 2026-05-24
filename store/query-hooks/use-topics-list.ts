import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QueryKeys } from "./types";
import { useSearchParams } from "next/navigation";
import { IAPITopicsList } from "@/app/api/topics-list/route";

export const useTopicsList = <TError = Error, TData = IAPITopicsList>(
  options?: Omit<
    UseQueryOptions<
      IAPITopicsList,
      TError,
      TData,
      [QueryKeys.TopicsList, object]
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const searchParams = useSearchParams();

  return useQuery({
    queryKey: [QueryKeys.TopicsList, Object.fromEntries(searchParams)],
    queryFn: async () => {
      const resp = await fetch(`/api/topics-list?${searchParams.toString()}`);
      if (!resp.ok) {
        throw new Error(`${resp.status}: ${resp.statusText}`);
      }

      return resp.json() as Promise<IAPITopicsList>;
    },
    placeholderData: (previousData) => previousData,
    ...options,
  });
};
