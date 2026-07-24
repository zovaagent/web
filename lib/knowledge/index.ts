import { db } from "@/lib/db";
import { knowledge, agents, agentKnowledge } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export interface SearchOptions {
  userId: string;
  query?: string;
  type?: string;
  limit?: number;
}

export async function searchKnowledge(options: SearchOptions) {
  const { userId, query, type, limit = 20 } = options;

  const conditions = [eq(knowledge.userId, userId)];

  if (type && type !== "all") {
    conditions.push(eq(knowledge.type, type));
  }

  const results = await db.query.knowledge.findMany({
    where: and(...conditions),
    limit,
  });

  // Simple text search (in production, use pgvector for semantic search)
  if (query) {
    const lowerQuery = query.toLowerCase();
    return results.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.content?.toLowerCase().includes(lowerQuery) ||
        item.category?.toLowerCase().includes(lowerQuery)
    );
  }

  return results;
}

export async function linkKnowledgeToAgent(
  agentId: string,
  knowledgeId: string
) {
  // Check if link already exists
  const existing = await db.query.agentKnowledge.findFirst({
    where: and(
      eq(agentKnowledge.agentId, agentId),
      eq(agentKnowledge.knowledgeId, knowledgeId)
    ),
  });

  if (existing) {
    return existing;
  }

  return db.insert(agentKnowledge).values({
    agentId,
    knowledgeId,
  });
}

export async function unlinkKnowledgeFromAgent(
  agentId: string,
  knowledgeId: string
) {
  return db
    .delete(agentKnowledge)
    .where(
      and(
        eq(agentKnowledge.agentId, agentId),
        eq(agentKnowledge.knowledgeId, knowledgeId)
      )
    );
}

export async function getKnowledgeForAgent(agentId: string) {
  const links = await db.query.agentKnowledge.findMany({
    where: eq(agentKnowledge.agentId, agentId),
  });

  const knowledgeItems = [];
  for (const link of links) {
    const item = await db.query.knowledge.findFirst({
      where: eq(knowledge.id, link.knowledgeId),
    });
    if (item) {
      knowledgeItems.push(item);
    }
  }

  return knowledgeItems;
}
