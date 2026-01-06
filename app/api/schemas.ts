import z from "zod";

export const topicsListSchema = z
  .object({
    id: z.int(),
    forum: z.string(),
    sect1: z.string(),
    sect2: z.string(),
    v8: z.string().nullable().optional(),
    closed: z.int(),
    down: z.int(),
    paid: z.int(),
    text: z.string(),
    message: z.string(),
    created: z.int(),
    utime: z.int(),
    user: z.string().nullable().optional(),
    user0: z.string(),
    is_voting: z.int(),
    answ: z.int(),
  })
  .transform((response) => ({
    id: response.id,
    forum: response.forum,
    section: response.sect1,
    sectionCode: response.sect2,
    author: response.user0,
    lastUser: response.user,
    created: response.created * 1000,
    updated: response.utime * 1000,
    count: response.answ,
    text: response.text,
    closed: response.closed === 1,
    down: response.down === 1,
    pinned: response.utime === 2147483648,
    isVoting: response.is_voting === 1,
  }))
  .array();

type ITopicsList = z.infer<typeof topicsListSchema>;
export type ITopicsListItem = ITopicsList[number];
