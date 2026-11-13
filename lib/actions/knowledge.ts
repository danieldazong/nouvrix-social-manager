"use server";

import { prisma } from "../prisma";
import { requireWorkspaceMember } from "../auth";
import { z } from "zod";

// 1. Validation Schemas
export const knowledgeSourceSchema = z.object({
  type: z.enum(["website", "document"]),
  content: z.string().min(1, "Content reference cannot be empty"),
});

export const factSchema = z.object({
  sourceId: z.string().optional(),
  content: z.string().min(10, "Fact must be detailed enough for the AI to use"),
});

// 2. Add a new knowledge source (e.g., a website URL to be scraped later)
export async function addKnowledgeSource(data: z.infer<typeof knowledgeSourceSchema>) {
  const { workspaceId, role } = await requireWorkspaceMember();
  
  if (role === "Viewer") throw new Error("Forbidden: Viewers cannot add sources");

  const validated = knowledgeSourceSchema.parse(data);

  return await prisma.knowledgeSource.create({
    data: {
      ...validated,
      workspaceId,
    },
  });
}

// 3. Add a new fact (Defaults to unverified)
export async function addFact(data: z.infer<typeof factSchema>) {
  const { workspaceId, role } = await requireWorkspaceMember();
  
  if (role === "Viewer") throw new Error("Forbidden: Viewers cannot add facts");

  const validated = factSchema.parse(data);

  return await prisma.fact.create({
    data: {
      ...validated,
      workspaceId,
      verificationState: "unverified",
    },
  });
}

// 4. Verify a fact (Admin or Approver only)
export async function verifyFact(factId: string, state: "approved" | "rejected") {
  const { workspaceId, userId, role } = await requireWorkspaceMember();

  if (role === "Viewer" || role === "Editor") {
    throw new Error("Forbidden: Only Admins or Approvers can verify facts");
  }

  // Ensure the fact actually belongs to this workspace before updating it
  const existingFact = await prisma.fact.findUnique({ where: { id: factId } });
  if (!existingFact || existingFact.workspaceId !== workspaceId) {
    throw new Error("Fact not found or unauthorized");
  }

  return await prisma.fact.update({
    where: { id: factId },
    data: {
      verificationState: state,
      verifiedBy: userId,
      verifiedAt: new Date(),
    },
  });
}