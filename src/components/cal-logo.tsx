'use client';

import Logo from '../../public/logo.png';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function CalLogo() {
  const {state} = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <div
            className={cn(
              'flex aspect-square size-10 items-center justify-center rounded-lg  text-sidebar-primary-foreground', state ==='collapsed' && 'size-8' 
            )}
          >
            <Image src={Logo} alt='logo' className='size-10' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight font-semibolds'>
            <span className='truncate font-semibold'>Cal</span>
            <span className='truncate text-xs text-primary'>Scheduler</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
