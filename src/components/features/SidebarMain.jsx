import { NavLink, useLocation } from 'react-router-dom';
import { Buttons } from '@/components/shared/Buttons';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar';

export const SidebarMain = ({ content }) => {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {content.map((item) => (
            <SidebarMenuItem className="flex flex-col gap-2" key={item.title}>
              <Buttons
                variant="ghost"
                size="lg"
                className={`flex-1 justify-start ${item.url === location.pathname ? 'bg-primary text-on-primary hover:bg-primary hover:text-on-primary' : ''} ${item.needSecondLayer ? 'pointer-events-none' : ''}`}
                asChild
              >
                <NavLink to={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </Buttons>
              {item.needSecondLayer ? (
                <SidebarMenuSub className="ml-10">
                  {item.secondLayer.map((layerItem) => (
                    <Buttons
                      variant="ghost"
                      size="lg"
                      className={`flex-1 justify-start ${layerItem.url === location.pathname ? 'bg-primary text-on-primary hover:bg-primary hover:text-on-primary' : ''}`}
                      asChild
                      key={layerItem.title}
                    >
                      <NavLink to={layerItem.url}>
                        <span>{layerItem.title}</span>
                      </NavLink>
                    </Buttons>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
