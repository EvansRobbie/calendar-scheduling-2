import { requireUser } from '@/_helpers/helper';
import { times } from '@/_helpers/times';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import prisma from '@/lib/db';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  });
  if (!data) return notFound();
  return data;
}

const availabilityPage = async () => {
  const session = await requireUser();
  const userData = await getData(session.user?.id as string);
  console.log(userData);
  const allAvailbleTime = times();
  console.log(allAvailbleTime);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          In this section you can manage your availability!
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className='space-y-4'>
          {userData.map((availability) => {
          const formattedTime = new Date().toISOString().split('T')[0];
    
          const fromTime = availability.fromTime; 
          const tillTime = availability.tillTime;
      
          const defaultStartTime = `${formattedTime}T${fromTime}:00.000Z`;
          const defaultEndTime = `${formattedTime}T${tillTime}:00.000Z`;
        

            return(
            <div
              key={availability.id}
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4'
            >
              <div className='flex items-center gap-x-3'>
                <Switch defaultChecked={availability.isActive} />
                <p>{availability.day}</p>
              </div>
              <Select defaultValue={format(new Date(defaultStartTime), 'hh:mm a')} >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='From time' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allAvailbleTime.map((time) => (
                      <SelectItem
                        key={format(time, 'hh:mm a')}
                        value={format(time, 'hh:mm a')}
                      >
                        {format(time, 'hh:mm a')}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select  defaultValue={format(new Date(defaultEndTime), 'hh:mm a')}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Till time' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allAvailbleTime.map((time) => (
                      <SelectItem
                        key={format(time, 'hh:mm a')}
                        value={format(time, 'hh:mm a')}
                      >
                        {format(time, 'hh:mm a')}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )})}
        </CardContent>
      </form>
    </Card>
  );
};

export default availabilityPage;
