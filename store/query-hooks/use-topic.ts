import {
  QueryClient,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { QueryKeys } from "./types";
import { ITopic } from "@/mista-api/types";

interface IProps {
  id: string;
}

export const useTopic = <TError = Error, TData = ITopic>(
  { id }: IProps,
  options?: Omit<
    UseQueryOptions<ITopic, TError, TData, [QueryKeys.TopicMessages, string]>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [QueryKeys.TopicMessages, id],
    queryFn: async () => {
      const resp = await fetch(`/api/topic/${id}`);
      if (!resp.ok) {
        throw new Error(`${resp.status}: ${resp.statusText}`);
      }

      return resp.json() as Promise<ITopic>;
    },
    placeholderData: (previousData) => previousData,
    ...options,
  });
};

export const getCachedTopicData = (
  queryClient: QueryClient,
  topicId: string,
) => {
  const topicQueries = queryClient.getQueriesData({
    queryKey: [QueryKeys.TopicMessages, topicId],
  });

  if (topicQueries.length === 0) return undefined;

  return topicQueries[0][1] as ITopic;
};
