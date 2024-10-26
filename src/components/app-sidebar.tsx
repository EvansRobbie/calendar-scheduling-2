'use client';
import { type User } from 'next-auth';

import {
  CalendarCheck,
  HomeIcon,
  Settings,
  SquareTerminal,
  User2,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { CalLogo } from './cal-logo';
interface AppSidebarProps {
  user?: User | undefined;
  // Other props...
}

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Get Started',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Event Types',
          url: '/dashboard',
          icon: HomeIcon,
        },
        {
          title: 'Meetings',
          url: '/dashboard/meetings',
          icon: User2,
        },
        {
          title: 'Availability',
          url: '/dashboard/availability',
          icon: CalendarCheck,
        },
        {
          title: 'Settings',
          url: '/dashboard/settings',
          icon: Settings,
        },
      ],
    },
  ],
};

export const AppSidebar: React.FC<AppSidebarProps> = ({
  user,
  ...props
}) => {


  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <CalLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
