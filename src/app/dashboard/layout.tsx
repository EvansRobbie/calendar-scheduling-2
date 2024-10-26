import { requireUser } from '@/_helpers/helper';
import { AppSidebar } from '@/components/app-sidebar';
import TopNav from '@/components/dashboard/top-nav';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireUser();
  const session = await auth();
  return (
    <>
      <SidebarProvider>
        <AppSidebar user={session?.user} />
        <SidebarInset>
          <TopNav />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
