import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function requireWorkspaceMember() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: No active session");
  }

  // Find the user's membership in our database
  const membership = await prisma.membership.findUnique({
    where: { clerkUserId: userId },
    include: { workspace: true }
  });

  if (!membership || membership.status !== "active") {
    throw new Error("Forbidden: You do not have access to this workspace");
  }

  return {
    userId,
    workspaceId: membership.workspaceId,
    role: membership.role,
    workspace: membership.workspace
  };
}