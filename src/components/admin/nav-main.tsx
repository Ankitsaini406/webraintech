"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Contact, Home, UserPlus, UsersIcon, Rss, MessageSquareDot, type LucideIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import axios from "axios"

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: { title: string; url: string }[];
}

export function NavMain({ items }: { items: NavItem[] }) {

  const pathname = usePathname();
  const [unreadCounts, setUnreadCounts] = useState({
    // enquery: 0,
    contactus: 0,
    newsletter: 0,
  })

  useEffect(() => {
    async function fetchUnReadCounts() {
      try {
        const [contactusRes, newsletterRes ] = await Promise.all([
          axios.get('/api/contact-us/unread-count'),
          axios.get('/api/newsletter/unread-count'),
        ]);

        setUnreadCounts({
          // enquery: enqueryRes.data.count,
          contactus: contactusRes.data.count,
          newsletter: newsletterRes.data.count,
        });
      } catch (error) {
        console.error("Error fetching unread counts:", error);
      }
    }

    fetchUnReadCounts();
    const interval = setInterval(fetchUnReadCounts, 100000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {/* Static Links */}
        <SidebarLink title="Home" url="/admin" icon={Home} />
        <SidebarLink title="Add Person" url="/admin/add-person" icon={UserPlus} />
        <SidebarLink title="All Persons" url="/admin/all-persons" icon={UsersIcon} />

        {/* Dynamic Unread Data */}        
        <SidebarLink title="Enquery" url="/admin/enquery" icon={MessageSquareDot} />
        <SidebarLink title="Contact Us" url="/admin/contact-us" icon={Contact} unreadCount={unreadCounts.contactus} />
        <SidebarLink title="News Letter" url="/admin/news-letter" icon={Rss} unreadCount={unreadCounts.newsletter} />

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

const SidebarLink = ({ title, url, icon: Icon, unreadCount = 0 }: { title: string; url: string; icon?: LucideIcon; unreadCount?: number }) => {
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
            {unreadCount > 0 && <SidebarMenuBadge>{unreadCount}</SidebarMenuBadge>}
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
