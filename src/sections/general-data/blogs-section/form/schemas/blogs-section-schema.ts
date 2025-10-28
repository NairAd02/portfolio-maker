import { z } from "zod";

export interface BlogsSectionSchema {
  blog_and_post_text: string;
}

export const blogsSectionSchema = z.object({
  blog_and_post_text: z.string(),
});
