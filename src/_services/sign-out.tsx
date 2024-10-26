'use server';
import { signOut } from '@/lib/auth';

export const signOutUser = async () => {
  await signOut({ redirectTo: '/' });
};
