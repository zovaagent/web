import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { knowledge } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const knowledgeItems = await db.query.knowledge.findMany({
      where: eq(knowledge.userId, session.user.id),
      orderBy: [desc(knowledge.createdAt)],
    });

    return NextResponse.json({ knowledge: knowledgeItems });
  } catch (error) {
    console.error("Failed to fetch knowledge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Verify ownership
    const item = await db.query.knowledge.findFirst({
      where: and(
        eq(knowledge.id, id),
        eq(knowledge.userId, session.user.id)
      ),
    });

    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await db.delete(knowledge).where(eq(knowledge.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete knowledge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
