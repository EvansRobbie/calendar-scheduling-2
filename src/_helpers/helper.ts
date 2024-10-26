import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const requireUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return redirect('/');
  }
  return session;
};
