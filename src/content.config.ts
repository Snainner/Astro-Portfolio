import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    heroImage:z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    companyLink: z.string().url().optional(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    summary: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
  experience: experienceCollection,
};