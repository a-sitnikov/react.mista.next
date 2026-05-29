import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QueryKeys } from "./types";
import { IAPITopicsList } from "@/app/api/topics-list/route";

interface IProps {
  page?: string;
  arena?: string;
  section?: string;
}

export const useTopicsList = <TError = Error, TData = IAPITopicsList>(
  { page, section, arena }: IProps,
  options?: Omit<
    UseQueryOptions<
      IAPITopicsList,
      TError,
      TData,
      [
        QueryKeys.TopicsList,
        string | undefined,
        string | undefined,
        string | undefined,
      ]
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [QueryKeys.TopicsList, page, arena, section],
    queryFn: async () => {
      const newSearchParams = new URLSearchParams();
      if (page) newSearchParams.set("page", page);
      if (arena) newSearchParams.set("arena", arena);
      if (section) newSearchParams.set("section", section);

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
