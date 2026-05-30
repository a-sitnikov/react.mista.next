import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QueryKeys } from "./types";
import { IMessage } from "@/mista-api/types";
import { getCachedTopicData } from "./use-topic-messages";

interface IProps {
  topicId: string;
  msgNumber: number;
}

export const useMessageData = <TError = Error, TData = IMessage>(
  { topicId, msgNumber }: IProps,
  options?: Omit<
    UseQueryOptions<
      IMessage,
      TError,
      TData,
      [QueryKeys.TopicMessageData, string, number]
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [QueryKeys.TopicMessageData, topicId, msgNumber],
    queryFn: async ({ client }) => {
      const cachedTopicData = getCachedTopicData(client, topicId);
      if (cachedTopicData) {
        const message = cachedTopicData.items.find(
          (item) => item.n === msgNumber,
        );
        if (message) return message;
      }

      const resp = await fetch(`/api/topic/${topicId}/${msgNumber}`);
      if (!resp.ok) {
        throw new Error(`${resp.status}: ${resp.statusText}`);
      }

      return resp.json() as Promise<IMessage>;
    },
    placeholderData: (previousData) => previousData,
    ...options,
  });
};
