import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  
  if (apiKey !== process.env.WORKER_API_KEY) {
    return NextResponse.json({ error: "Unauthorized worker access" }, { status: 401 });
  }

  const workspaceId = req.nextUrl.searchParams.get("workspaceId");

  if (!workspaceId) {
    return NextResponse.json({ error: "Missing workspaceId" }, { status: 400 });
  }

  const facts = await prisma.fact.findMany({
    where: {
      workspaceId: workspaceId,
      verificationState: "approved",
    },
    select: {
      content: true,
      verifiedAt: true,
    }
  });

  return NextResponse.json({ facts });
}