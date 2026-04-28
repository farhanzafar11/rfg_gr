import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.username === "farhanzaf112@gmail.com" &&
          credentials?.password === "123456789"
        ) {
          return { id: "1", name: "Admin", email: "farhanzaf112@gmail.com" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }
      
      const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN;
      if (allowedDomain && profile?.email) {
        return profile.email.endsWith(`@${allowedDomain}`);
      }
      
      const whitelist = process.env.ALLOWED_EMAILS?.split(",").map(e => e.trim()) ?? [];
      if (whitelist.length > 0 && profile?.email) {
        return whitelist.includes(profile.email);
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
})
