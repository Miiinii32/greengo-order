import { POSTlogout } from '@/api/authRequestApi';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/AdminSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

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
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </>
  );
};
