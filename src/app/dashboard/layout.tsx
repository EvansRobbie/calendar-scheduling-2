import { AppSidebar } from '@/components/app-sidebar';
import TopNav from '@/components/dashboard/top-nav';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopNav />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
