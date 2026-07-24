/* eslint-disable @typescript-eslint/no-explicit-any */
let io: any = null;

export function getIO(): any {
  if (typeof window !== "undefined") {
    return null;
  }
  return (global as any).io || null;
}

export function emitToUser(userId: string, event: string, data: unknown) {
  const io = getIO();
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
  }
}

export function emitAgentUpdate(
  userId: string,
  agentId: string,
  update: {
    status?: string;
    progress?: number;
    currentTask?: string;
    reasoning?: string;
  }
) {
  emitToUser(userId, "agent:update", {
    agentId,
    ...update,
    timestamp: Date.now(),
  });
}

export function emitAgentLog(
  userId: string,
  agentId: string,
  log: { level: string; message: string }
) {
  emitToUser(userId, "agent:log", {
    agentId,
    ...log,
    timestamp: Date.now(),
  });
}

export function emitActivityEvent(
  userId: string,
  event: {
    agentId: string;
    agentName?: string;
    kind: string;
    message: string;
  }
) {
  emitToUser(userId, "activity:new", {
    ...event,
    timestamp: Date.now(),
  });
}
