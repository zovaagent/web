import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { agents, executions } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify agent belongs to user
    const agent = await db.query.agents.findFirst({
      where: and(eq(agents.id, id), eq(agents.userId, session.user.id)),
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Get executions for this agent
    const agentExecutions = await db.query.executions.findMany({
      where: eq(executions.agentId, id),
      orderBy: [desc(executions.startedAt)],
      limit: 20,
    });

    return NextResponse.json({ executions: agentExecutions });
  } catch (error) {
    console.error("Failed to fetch executions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
