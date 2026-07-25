"use client";

import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type UserState = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        set({ user: data.user, loading: false });
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }
  },
}));
