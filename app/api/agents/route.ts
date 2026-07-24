import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { getAgentsByUser } from "@/lib/db/queries";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const agents = await getAgentsByUser(session.user.id);
    return NextResponse.json({ agents });
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
