import z from "zod";

export const sectionSchema = z
  .object({
    id: z.int(),
    forum: z.string(),
    shortn: z.string(),
    fulln: z.string(),
  })
  .transform((response) => ({
    id: response.id,
    forum: response.forum,
    code: response.shortn,
    name: response.fulln,
  }));

export type ISection = z.infer<typeof sectionSchema>;
