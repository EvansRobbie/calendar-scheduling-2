'use client';
import { cn } from '@/lib/utils';
import { Loader2, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import GithubLogo from '../../../public/github.svg';
import GoogleLogo from '../../../public/google.svg';
import { Button } from '../ui/button';

export const GoogleButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={'outline'} className='w-full'>
          <Loader2 className='animate-spin mr-2 size-4' />
        </Button>
      ) : (
        <Button variant={'outline'} className='w-full'>
          <Image src={GoogleLogo} alt={'logo'} className='size-4 mr-2' />
          Sign in with Google
        </Button>
      )}
    </>
  );
};

export const GithubButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={'outline'} className='w-full'>
          <Loader2 className='animate-spin mr-2 size-4' />
        </Button>
      ) : (
        <Button variant={'outline'} className='w-full'>
          <Image src={GithubLogo} alt={'logo'} className='size-4 mr-2' />
          Sign in with Github
        </Button>
      )}
    </>
  );
};

export const LogoutButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={'outline'} className='w-full'>
          <Loader2 className='animate-spin mr-2 size-4' />
        </Button>
      ) : (
        <Button
          variant={'outline'}
          className='w-full justify-start items-start border-none'
        >
          <LogOut className='mr-2' />
          Log out
        </Button>
      )}
    </>
  );
};

export const SubmitButton = ({
  text,
  variant = 'default',
  className,
}: {
  text?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  className?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={'outline'} className={cn('w-fit', className)}>
          <Loader2 className='animate-spin mr-2 size-4' /> Please wait ...
        </Button>
      ) : (
        <Button
          type='submit'
          className={cn('w-fit', className)}
          variant={variant}
        >
          {text}
        </Button>
      )}
    </>
  );
};
