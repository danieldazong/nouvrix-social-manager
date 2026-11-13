import { prisma } from "../prisma";
import { z } from "zod";

// 1. Strict Zod schemas for AI JSON validation
export const postVariantSchema = z.object({
  platform: z.enum(["facebook", "instagram", "linkedin"]),
  caption: z.string().min(1, "Caption cannot be empty"),
  cta: z.string().optional(),
});

export const postSchema = z.object({
  title: z.string(),
  variants: z.array(postVariantSchema),
});

export const contentIdeaSchema = z.object({
  weekId: z.string(),
  topic: z.string(),
  pillar: z.string().optional(),
  evidenceRefs: z.string().optional(),
  posts: z.array(postSchema),
});

// 2. Machine-to-Machine function to save AI content safely
export async function saveGeneratedContent(workspaceId: string, data: z.infer<typeof contentIdeaSchema>) {
  // Validate the AI's raw JSON against our strict rules
  const validated = contentIdeaSchema.parse(data);

  // Write the Idea, the Posts, and the Platform Variants to the database all at once
  return await prisma.contentIdea.create({
    data: {
      workspaceId,
      weekId: validated.weekId,
      topic: validated.topic,
      pillar: validated.pillar,
      evidenceRefs: validated.evidenceRefs,
      posts: {
        create: validated.posts.map(post => ({
          workspaceId,
          title: post.title,
          variants: {
            create: post.variants.map(variant => ({
              platform: variant.platform,
              caption: variant.caption,
              cta: variant.cta,
            }))
          }
        }))
      }
    }
  });
}