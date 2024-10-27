'use client';
import { settingsAction } from '@/_services/settings';
import { settingsSchema } from '@/lib/zodSchemas';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { FC, useState } from 'react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '../shared/submit-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { UploadDropzone } from '@/_helpers/upload-thing';
import { toast } from 'sonner';
interface SettingsFormProps {
  fullName: string;
  email: string;
  profileImage: string;
}

const SettingsForm: FC<SettingsFormProps> = ({
  fullName,
  email,
  profileImage,
}) => {
  const [lastResult, action] = useFormState(settingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <Input
              defaultValue={fullName}
              id='name'
              name={fields.fullName.name}
              key={fields.fullName.key}
              placeholder='Your full name'
            />
            <p className='text-sm text-destructive'>{fields.fullName.errors}</p>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              defaultValue={email}
              disabled
              id='email'
              placeholder='test@exammple.com'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='profileImage'>Profile Image</Label>
            <Input
              className='hidden'
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className='relative size-20'>
                <Image
                  src={currentProfileImage}
                  alt='Profile Image
                  '
                  width={50}
                  height={50}
                  className='rounded-lg size-20'
                />
                <Button
                  onClick={() => setCurrentProfileImage('')}
                  type='button'
                  variant={'destructive'}
                  size={'icon'}
                  className='absolute -right-4 -top-2 z-10 rounded-full'
                >
                  <Pencil className='size-4' />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(data) => {
                  setCurrentProfileImage(data[0].url);
                  toast.success('Profile image uploaded');
                }}
                onUploadError={(err) => {
                  toast.error(err.message);
                }}
                endpoint={'imageUploader'}
              />
            )}
            <p className='text-sm text-destructive'>{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text='Save Changes' />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
