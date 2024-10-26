import { onboardingAction } from '@/_services/onboarding';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

const onboardingPage = () => {
  return (
    <div className=' min-h-screen w-full flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to Cal <span className='text-primary'>Scheduler</span>{' '}
          </CardTitle>
          <CardDescription>
            We need the following information to set up your profile
          </CardDescription>
        </CardHeader>
        <form
          action={async () => {
            const formData = new FormData();
            await onboardingAction(formData);
          }}
        >
          <CardContent className='space-y-4 w-full'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input placeholder='John Doe' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <div className='flex rounded-md'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm tsxt-muted-foreground'>
                  CalJohndoe.com/
                </span>
                <Input className='rounded-l-none' placeholder='user-1' />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full '>Get Started</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default onboardingPage;
