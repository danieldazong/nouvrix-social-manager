import { NextRequest, NextResponse } from "next/server";
import { saveGeneratedContent } from "@/lib/actions/content";

export async function POST(req: NextRequest) {
  // 1. Verify the secure machine-to-machine key
  const apiKey = req.headers.get("x-api-key");
  
  if (apiKey !== process.env.WORKER_API_KEY) {
    return NextResponse.json({ error: "Unauthorized worker access" }, { status: 401 });
  }

  // 2. Ensure n8n passes the target workspace ID
  const workspaceId = req.nextUrl.searchParams.get("workspaceId");

  if (!workspaceId) {
    return NextResponse.json({ error: "Missing workspaceId" }, { status: 400 });
  }

  try {
    // 3. Read the JSON payload sent by n8n
    const body = await req.json();
    
    // 4. Pass it to our secure action for Zod validation and database insertion
    const savedIdea = await saveGeneratedContent(workspaceId, body);
    
    return NextResponse.json({ success: true, ideaId: savedIdea.id }, { status: 201 });
  } catch (error: any) {
    // If n8n hallucinates and sends bad JSON, we reject it and tell it why
    return NextResponse.json({ error: error.message || "Invalid payload format" }, { status: 400 });
  }
}