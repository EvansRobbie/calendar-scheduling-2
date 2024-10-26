import { requireUser } from '@/_helpers/helper';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
    },
  });

  if (!data?.userName) {
    return redirect('/onboarding');
  }
}
export default async function Page() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  console.log(data);
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
      </div>
      <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
    </div>
  );
}
