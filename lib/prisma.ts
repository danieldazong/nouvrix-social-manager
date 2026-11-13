// This file is used to create a singleton instance of the PrismaClient, which is used to interact with the database.
// The PrismaClient is created only once and reused throughout the application,
// which helps to avoid creating multiple instances of the client and improves performance.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;