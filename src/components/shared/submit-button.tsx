'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import GoogleLogo from '../../../public/google.svg';
import GithubLogo from '../../../public/github.svg';
import Image from 'next/image';
import { Loader2, LogOut } from 'lucide-react';

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
        <Button variant={'outline'} className='w-full justify-start items-start border-none'>
           <LogOut className='mr-2' />
           Log out
          
        </Button>
      )}
    </>
  );
};
