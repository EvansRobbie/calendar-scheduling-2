import SettingsForm from '@/components/settings/settings-form';
import React from 'react';
import prisma from '@/lib/db'
import { requireUser } from '@/_helpers/helper'
import { notFound } from 'next/navigation'
async function getData(userId:string){
  const data = await prisma.user.findUnique({
    where:{
      id:userId
    },
    select:{name:true, email:true, image:true}
  })
  if(!data){
    return notFound()
  }
  return data
}

const settingsPage = async () => {
  const session = await requireUser()
  const userData = await getData(session.user?.id as string)
  return <SettingsForm fullName={userData?.name as string} email={userData?.email as string} profileImage={userData?.image as string}/>;
};
export default settingsPage;
