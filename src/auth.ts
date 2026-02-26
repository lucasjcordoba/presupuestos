import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { SupabaseAdapter } from '@auth/supabase-adapter';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
