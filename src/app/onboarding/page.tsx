'use client';
import { onboardingAction } from '@/_services/onboarding';
import { SubmitButton } from '@/components/shared/submit-button';
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
import { onboardingSchema } from '@/lib/zodSchemas';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState } from 'react-dom';

const onboardingPage = () => {
  const [lastResult, action] = useFormState(onboardingAction, undefined); // react 19 useActionState

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
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
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className='space-y-4 w-full'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder='John Doe'
              />
              <p className='text-destructive text-sm'>
                {fields.fullName.errors}
              </p>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <div className='flex rounded-md'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm tsxt-muted-foreground'>
                  CalJohndoe.com/
                </span>
                <Input
                  className='rounded-l-none'
                  id={'username'}
                  name={fields.userName.name}
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                  placeholder='user-1'
                />
              </div>
              <p className='text-destructive text-sm'>
                {fields.userName.errors}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text='Get Started' className='w-full' />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default onboardingPage;
