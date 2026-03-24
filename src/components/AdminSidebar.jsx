import * as React from 'react';
import { SIDEBAR_MENU } from '@/config/admin/sidebarConfig';
import { NavLink } from 'react-router-dom';
import { Buttons } from './shared/Buttons';
import { SidebarMain } from '@/components/SidebarMain';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function AdminSidebar({ logout, ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* sidebar header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-3!">
              <NavLink to={SIDEBAR_MENU.sidebarHeader.url}>
                <img
                  src={SIDEBAR_MENU.sidebarHeader.filePosition}
                  alt={SIDEBAR_MENU.sidebarHeader.title}
                />
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* sidebar content */}
      <SidebarContent>
        <SidebarMain content={SIDEBAR_MENU.sidebarMain} />
      </SidebarContent>

      {/* sidebar footer */}
      <SidebarFooter className="h-16 flex justify-center border-t border-outline">
        <SidebarMenu>
          <SidebarMenuItem className="flex">
            <Buttons variant="ghost" size="lg" className="flex-1 justify-start" onClick={logout}>
              {SIDEBAR_MENU.sidebarFooter.icon}
              <span>{SIDEBAR_MENU.sidebarFooter.title}</span>
            </Buttons>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
