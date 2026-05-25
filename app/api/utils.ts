import { IMessage } from "@/mista-api/types";

export const fetchMessage = async (topicId: string, messageId: string) => {
  try {
    const response = await fetch(`/api/topic/${topicId}/${messageId}`);
    const data = (await response.json()) as IMessage;
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
