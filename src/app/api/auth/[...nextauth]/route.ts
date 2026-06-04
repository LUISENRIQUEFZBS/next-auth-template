import NextAuth, { Account, Profile, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    
    // 1. RUN ON LOGIN → create/update user in DB
    // IF user exists → update ( users may change their name or profile picture in Google, so we want to update that in our DB )
    // IF user does not exist → create
    async signIn({ user }: { user: User; account: Account | null; profile?: Profile }) {
      if (!user.email) return false;

      await prisma.user.upsert({
        where: {
          email: user.email,
        },
        update: {
          name: user.name,
          image: user.image,
        },
        create: {
          email: user.email,
          name: user.name,
          image: user.image,
          role: "USER",
        },
      });

      return true;
    },
    // 2. JWT → runs ONCE after login (this is the improvement)
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // runs on login OR when token is created
      if (user) {
        // FIRST LOGIN ONLY
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }

        return token;
      }

      // AFTER LOGIN → just reuse token (NO DB CALL)
      return token;
    },

    // 3. ADD DB DATA INTO SESSION
    async session({ session, token }:{session: Session;token: JWT;}) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };