"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home, UserPlus, UsersIcon, type LucideIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: { title: string; url: string }[];
}

export function NavMain({ items }: { items: NavItem[] }) {

  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {/* Static Links */}
        <SidebarLink title="Home" url="/admin" icon={Home} />
        <SidebarLink title="Add Person" url="/admin/add-person" icon={UserPlus} />
        <SidebarLink title="All Persons" url="/admin/all-persons" icon={UsersIcon} />

        {/* Dynamic Menu Items */}
        {items.map((item) => {
          const isActive = pathname.startsWith(item.url);
          return (
            <Collapsible key={item.title} asChild defaultOpen={isActive}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                        isActive ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md dark:shadow-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarSubLink key={subItem.title} {...subItem} />
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const SidebarLink = ({ title, url, icon: Icon }: { title: string; url: string; icon?: LucideIcon }) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <SidebarMenuItem>
      <Link href={url} passHref>
        <SidebarMenuButton
          tooltip={title}
          asChild
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
            isActive ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md dark:shadow-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon />}
            <span>{title}</span>
          </span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};

/** Reusable Submenu Link */
const SidebarSubLink = ({ title, url }: { title: string; url: string }) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link href={url} className={clsx("px-4 py-2 rounded-md transition-colors",
            isActive ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md dark:shadow-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800")}>
          <span>
            {title}
          </span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};
