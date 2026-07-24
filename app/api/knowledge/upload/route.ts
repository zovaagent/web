import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { knowledge } from "@/lib/db/schema";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = join(process.cwd(), "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }
}

function getFileType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return "document";
    case "md":
    case "markdown":
      return "document";
    case "txt":
      return "document";
    case "doc":
    case "docx":
      return "document";
    case "json":
      return "document";
    case "csv":
      return "document";
    default:
      return "document";
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const category = formData.get("category") as string | null;
    const content = formData.get("content") as string | null;

    // Handle URL or note type (no file)
    if (!file && content) {
      const type = formData.get("type") as string || "note";
      const meta = formData.get("meta") as string || "";

      const [newKnowledge] = await db
        .insert(knowledge)
        .values({
          userId: session.user.id,
          title: title || "Untitled",
          type,
          content,
          meta,
          category: category || undefined,
        })
        .returning({ id: knowledge.id });

      return NextResponse.json({
        knowledge: {
          id: newKnowledge.id,
          title: title || "Untitled",
          type,
          content,
          meta,
          category,
        },
      });
    }

    if (!file) {
      return NextResponse.json(
        { error: "File or content is required" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    await ensureUploadDir();

    // Generate unique filename
    const fileId = randomUUID();
    const ext = file.name.split(".").pop() || "bin";
    const filename = `${fileId}.${ext}`;
    const filepath = join(UPLOAD_DIR, filename);

    // Save file
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // Extract content based on file type
    let extractedContent = "";
    if (ext === "txt" || ext === "md" || ext === "json" || ext === "csv") {
      extractedContent = Buffer.from(bytes).toString("utf-8");
    }

    // Save to database
    const fileType = getFileType(file.name);
    const meta = `${ext.toUpperCase()} · ${formatFileSize(file.size)}`;

    const [newKnowledge] = await db
      .insert(knowledge)
      .values({
        userId: session.user.id,
        title: title || file.name,
        type: fileType,
        content: extractedContent || `File uploaded: ${file.name}`,
        meta,
        category: category || undefined,
        metadata: {
          filename,
          originalName: file.name,
          size: file.size,
          mimeType: file.type,
        },
      })
      .returning({ id: knowledge.id });

    return NextResponse.json({
      knowledge: {
        id: newKnowledge.id,
        title: title || file.name,
        type: fileType,
        content: extractedContent,
        meta,
        category,
      },
    });
  } catch (error) {
    console.error("Knowledge upload failed:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
