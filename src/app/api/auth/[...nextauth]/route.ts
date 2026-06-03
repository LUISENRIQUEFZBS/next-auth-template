import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

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
    async signIn({ user }: any) {
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

    // 2. ADD DB DATA INTO SESSION
    async session({ session }: any) {
      if (!session.user?.email) return session;
      // Fetch real DB user:
      const dbUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };