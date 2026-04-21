import { z } from 'zod';

export const NoteFrontmatterSchema = z.object({
  title: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  lessonNumber: z.string().optional(),
  tags: z.array(z.string()).default([]),
  summary: z.string().optional(),
  order: z.number().optional(),
});

export type NoteFrontmatter = z.infer<typeof NoteFrontmatterSchema>;
