import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { getActivityByUser } from "@/lib/db/queries";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const activity = await getActivityByUser(session.user.id);
    return NextResponse.json({ activity });
  } catch (error) {
    console.error("Failed to fetch activity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
