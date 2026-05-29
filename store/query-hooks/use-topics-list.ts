import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QueryKeys } from "./types";
import { useSearchParams } from "next/navigation";
import { IAPITopicsList } from "@/app/api/topics-list/route";

interface IProps {
  section?: string;
  arena?: string;
}

export const useTopicsList = <TError = Error, TData = IAPITopicsList>(
  { section, arena }: IProps,
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
  const objectKey = Object.fromEntries(searchParams);
  if (section) objectKey.section = section;
  if (arena) objectKey.arena = arena;

  return useQuery({
    queryKey: [QueryKeys.TopicsList, objectKey],
    queryFn: async () => {
      const newSearchParams = new URLSearchParams(objectKey);

      const resp = await fetch(
        `/api/topics-list?${newSearchParams.toString()}`,
      );
      if (!resp.ok) {
        throw new Error(`${resp.status}: ${resp.statusText}`);
      }

      return resp.json() as Promise<IAPITopicsList>;
    },
    placeholderData: (previousData) => previousData,
    ...options,
  });
};
