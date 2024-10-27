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
    },
  });
  return redirect('/dashboard');
};
