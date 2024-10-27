import { requireUser } from '@/_helpers/helper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react'

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
 

  });
  if(!data) return notFound()
    return data
}

const availabilityPage = async () => {
  const session = await requireUser();
  const userData = await getData(session.user?.id as string)
  console.log(userData)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>In this section you can manage your availability!</CardDescription>
      </CardHeader>
      <form>
        <CardContent>
          {userData.map((availability) => (
            <div key={availability.id} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4'>
            
            </div>
          ))}
        </CardContent>
      </form>
    </Card>
  )
}

export default availabilityPage