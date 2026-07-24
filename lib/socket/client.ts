"use client";

import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(typeof window !== "undefined" ? window.location.origin : "", {
      path: "/api/socketio",
      transports: ["websocket", "polling"],
    });
  }
  return socket;
}

export function useSocket(userId?: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const s = getSocket();
    socketRef.current = s;

    s.emit("join", userId);

    return () => {
      s.disconnect();
      socketRef.current = null;
      socket = null;
    };
  }, [userId]);

  const emitAgentStatus = useCallback(
    (agentId: string, status: string, progress?: number) => {
      socketRef.current?.emit("agent:status", { agentId, status, progress });
    },
    []
  );

  const emitAgentLog = useCallback(
    (agentId: string, level: string, message: string) => {
      socketRef.current?.emit("agent:log", { agentId, level, message });
    },
    []
  );

  const emitActivity = useCallback(
    (agentId: string, kind: string, message: string) => {
      socketRef.current?.emit("activity", { agentId, kind, message });
    },
    []
  );

  return {
    socket: socketRef.current,
    emitAgentStatus,
    emitAgentLog,
    emitActivity,
  };
}

export function useSocketEvent<T = unknown>(
  event: string,
  handler: (data: T) => void
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const s = getSocket();

    const listener = (data: T) => {
      handlerRef.current(data);
    };

    s.on(event, listener);

    return () => {
      s.off(event, listener);
    };
  }, [event]);
}
