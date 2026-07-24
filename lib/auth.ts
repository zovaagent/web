import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      plan: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const { db } = await import("@/lib/db");
          const { profiles } = await import("@/lib/db/schema");
          await db.insert(profiles).values({
            id: user.id,
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          });
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
