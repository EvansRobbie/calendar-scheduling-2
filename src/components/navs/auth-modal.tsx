import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import Logo from '../../../public/logo.png';
import Image from 'next/image';
import { signIn } from '@/lib/auth';
import { GithubButton, GoogleButton } from '../shared/submit-button';

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[360px]'>
        <DialogHeader className='flex items-center gap-x-2 flex-row justify-center'>
          <Image src={Logo} alt={'logo'} className='size-10' />
          <h4 className='text-2xl font-semibold'>
            Cal <span className='text-primary'>Scheduler</span>
          </h4>
        </DialogHeader>
        <div className='w-full mt-5 space-y-3 flex flex-col '>
          <form
            className='w-full'
            action={async () => {
              'use server';

              await signIn('google');
            }}
          >
            <GoogleButton />
          </form>
          <form
            action={async () => {
              'use server';

              await signIn('github');
            }}
            className='w-full'
          >
          <GithubButton/>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
