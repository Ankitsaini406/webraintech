"use client"

import * as React from "react"
import { BookOpen, PieChart, Settings2, Users, Users2 } from "lucide-react"
import { NavMain } from "@/components/admin/nav-main"
import { NavUser } from "@/components/admin/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar"
import { NavProjects } from "./nav-projects"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Students",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Fees",
          url: "/admin/students/fees",
        },
      ],
    },
    {
      title: "Teachers",
      url: "#",
      icon: Users2,
      items: [
        {
          title: "Add Teachers",
          url: "#",
        },
        {
          title: "Salery",
          url: "#",
        },
      ],
    },
    {
      title: "Courses",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Add Courses",
          url: "/admin/courses/add-courses",
        },
        {
          title: "All Course",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
}

export function AdminSiderBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
