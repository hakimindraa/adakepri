import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const envAdminUser = process.env.ADMIN_USERNAME?.trim().toLowerCase();
        if (envAdminUser && user.email?.toLowerCase().includes(envAdminUser)) {
          return false;
        }
      }
      return true;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/umkm/create") ||
        nextUrl.pathname.startsWith("/freelancers/create");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = (token.id as string) || (token.sub as string);
        (session.user as any).role = (token.role as string) || "USER";
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
