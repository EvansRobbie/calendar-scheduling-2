'use server';

import { requireUser } from '@/_helpers/helper';
import prisma from '@/lib/db';
import { onboardingSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';

export const onboardingAction = async (formData: FormData) => {
  const session = await requireUser();
  const submission = await parseWithZod(formData, {
    schema: onboardingSchema,
  });
  if (submission.status !== 'success') {
    return submission.reply();
  }
  const data = prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });
};
