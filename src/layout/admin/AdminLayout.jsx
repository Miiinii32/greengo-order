import { POSTlogout } from '@/api/authRequestApi';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/AdminSidebar';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
// import data from '@/app/dashboard/data.json';

export const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await POSTlogout();
      document.cookie = 'ggoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      alert('恭喜！後台登出成功');
      navigate('/admin/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TooltipProvider>
        <SidebarProvider
          style={{
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          }}
        >
          <AdminSidebar variant="inset" logout={logout} />
          <SidebarInset>
            {/* <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <SectionCards />
                  <div className="px-4 lg:px-6">
                    <ChartAreaInteractive />
                  </div>
                  <DataTable data={data} />
                </div>
              </div>
            </div> */}
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </>
  );
};
