"use server";

import { prisma } from "../prisma";
import { requireWorkspaceMember } from "../auth";
import { z } from "zod";

// 1. Define the strict validation schema for our Brand Profile
export const brandProfileSchema = z.object({
  website: z.string().url().optional().or(z.literal("")),
  voiceRules: z.string().optional(),
  audience: z.string().optional(),
  goals: z.string().optional(),
  pillars: z.string().optional(),
});

export type BrandProfileInput = z.infer<typeof brandProfileSchema>;

// 2. Secure action to retrieve the current workspace's brand profile
export async function getBrandProfile() {
  const { workspaceId } = await requireWorkspaceMember();

  return await prisma.brandProfile.findUnique({
    where: { workspaceId },
  });
}

// 3. Secure action to create or update the brand profile
export async function upsertBrandProfile(data: BrandProfileInput) {
  const { workspaceId, role } = await requireWorkspaceMember();

  // Enforce server-side role check: Only Admins manage the brand profile
  if (role !== "Admin") {
    throw new Error("Forbidden: Only Admins can modify the brand profile");
  }

  // Validate incoming data against our Zod schema
  const validatedData = brandProfileSchema.parse(data);

  // Upsert: Update if it exists, Create if it doesn't
  const profile = await prisma.brandProfile.upsert({
    where: { workspaceId },
    update: validatedData,
    create: {
      ...validatedData,
      workspaceId,
    },
  });

  return profile;
}