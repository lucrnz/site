import { defineCollection, z } from "astro:content";
import {
  LicenseName,
  AuthorName,
  DEFAULT_LICENSE,
  DEFAULT_AUTHOR
} from "../consts";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    longDescription: z.string(),
    // Transform string to Date object
    pubDate: z.string().transform((val) => new Date(val)),
    coverImg: z.string().optional(),
    coverAlt: z.string().optional(),
    published: z.boolean().optional().default(true),
    // TODO: Properly check if fields are part of the enum
    license: z.string().optional().default(LicenseName[DEFAULT_LICENSE]),
    author: z.string().optional().default(AuthorName[DEFAULT_AUTHOR]),
    tags: z.string().transform((val) => val.split(",").map((val) => val.trim()))
  })
});

export const collections = { blog };
