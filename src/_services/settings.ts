'use server';
import { requireUser } from "@/_helpers/helper";
import prisma from "@/lib/db";
import { settingsSchema } from "@/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export const settingsAction = async (prevState: unknown, formData: FormData) => {
  const session = await requireUser();
  const  submission = await parseWithZod(formData, {
    schema: settingsSchema
  })
  if(submission.status !== 'success') {
    return submission.reply()
  }
  await prisma.user.update({
    where: {
      id: session.user?.id
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage
    }
  })

  return redirect('/dashboard')
}