import { defineCollection, z } from 'astro:content'

const weeklyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    issue: z.number(),
    title: z.string(),
    date: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
})

export const collections = {
  weekly: weeklyCollection,
}
