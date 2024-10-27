import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google({
      authorization: {
        params: {
          url: 'https://accounts.google.com/o/oauth2/v2/auth',
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.events openid',
        },
      },
    }),
  ],
});
