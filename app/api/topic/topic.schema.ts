import { z } from "zod";

const votingSchema = z.object({
  select: z.string(),
  result: z.number(),
});

export const topicInfoSchema = z
  .object({
    id: z.string(),
    text: z.string(),
    forum: z.string(),
    section: z.string(),
    created: z.string(),
    user_id: z.string(),
    user_name: z.string(),
    updated: z.string(),
    updated_name: z.string(),
    answers_count: z.string(),
    down: z.number(),
    closed: z.number(),
    deleted: z.number(),
    is_voting: z.number(),
    voting: z.array(votingSchema).optional(),
  })
  .transform((response) => ({
    id: response.id,
    title: response.text,
    forum: response.forum,
    sectionId: response.section,
    created: parseInt(response.created) * 1000,
    authorId: response.user_id,
    author: response.user_name,
    updated: parseInt(response.updated) * 1000,
    lastUser: response.updated_name,
    count: parseInt(response.answers_count),
    down: response.down,
    closed: response.closed,
    deleted: response.deleted,
    isVoting: response.is_voting === 1,
    voting: response.voting,
  }));

export const messageSchema = z
  .object({
    id: z.string(),
    n: z.string(),
    user: z.string(),
    userId: z.string(),
    text: z.string(),
    utime: z.string(),
    vote: z.number(),
  })
  .transform((response) => ({
    id: response.id,
    n: parseInt(response.n),
    user: response.user,
    userId: response.userId,
    text: response.text,
    time: parseInt(response.utime) * 1000,
    vote: response.vote,
  }));

export type ITopicInfo = z.infer<typeof topicInfoSchema>;
export type IMessage = z.infer<typeof messageSchema>;

export type ITopic = {
  info: ITopicInfo;
  items: IMessage[];
};
