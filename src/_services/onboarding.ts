'use server';

import { requireUser } from '@/_helpers/helper';
import prisma from '@/lib/db';
import { onboardingSchemaValidation } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export const onboardingAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const session = await requireUser();
  console.log(session);
  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const user = await prisma.user.findUnique({
          where: {
            userName: formData.get('userName') as string,
          },
        });
        return !user;
      },
    }),
    async: true,
  });
  if (submission.status !== 'success') {
    return submission.reply();
  }
  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
      availability: {
        createMany: {
          data: [
            {
              day: 'Monday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Tuesday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Wednesday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Thursday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Friday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Saturday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Sunday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
          ],
        },
      },
    },
  });
  return redirect('/dashboard');
};
