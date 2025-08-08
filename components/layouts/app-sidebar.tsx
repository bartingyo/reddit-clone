import ArrowUpCircleOutline from "@/components/icons/arrow-up-circle-outline";
import ArrowUpCircleSolid from "@/components/icons/arrow-up-circle-solid";
import CheckCircleOutline from "@/components/icons/check-circle-outline";
import CheckCircleSolid from "@/components/icons/check-circle-solid";
import HomeOutline from "@/components/icons/home-outline";
import HomeSolid from "@/components/icons/home-solid";
import SettingsOutline from "@/components/icons/settings-outline";
import SettingsSolid from "@/components/icons/settings-solid";
import UsersOutline from "@/components/icons/users-outline";
import UsersSolid from "@/components/icons/users-solid";
import AppSidebarMenuButton from "@/components/layouts/app-sidebar-menu-button";
import AppSidebarMenuCollapsible from "@/components/layouts/app-sidebar-menu-collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator
} from "@/components/ui/sidebar";
import CommunityCreate from "@/features/communities/components/community-create";
import CommunityNavItems from "@/features/communities/components/community-nav-items";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: <HomeOutline />,
    selected: <HomeSolid />
  },
  {
    title: "Popular",
    url: "/popular",
    icon: <ArrowUpCircleOutline />,
    selected: <ArrowUpCircleSolid />
  },
  {
    title: "Explore",
    url: "/explore",
    icon: <UsersOutline />,
    selected: <UsersSolid />
  },
  {
    title: "All",
    url: "/all",
    icon: <CheckCircleOutline />,
    selected: <CheckCircleSolid />
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <AppSidebarMenuButton {...item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <AppSidebarMenuCollapsible title="Communities">
          <SidebarMenu>
            <SidebarMenuItem>
              <CommunityCreate />
            </SidebarMenuItem>

            <SidebarMenuItem>
              <AppSidebarMenuButton
                title="Manage Communities"
                url="/communities"
                icon={<SettingsOutline />}
                selected={<SettingsSolid />}
              />
            </SidebarMenuItem>

            <CommunityNavItems />
          </SidebarMenu>
        </AppSidebarMenuCollapsible>

        <SidebarSeparator />
        <SidebarSeparator />
        <SidebarSeparator />
      </SidebarContent>
    </Sidebar>
  );
}
