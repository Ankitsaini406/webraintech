"use client"

import { useEffect} from "react"
import { BookOpen, PieChart, Settings2, UsersIcon, Users2 } from "lucide-react"
import { NavMain } from "@/components/admin/nav-main"
import { NavUser } from "@/components/admin/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar"
import { NavProjects } from "./nav-projects"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { getCookie } from "cookies-next"
import { decodeToken } from "@/utils/jwt"
import { Users } from "@/utils/InitialState";
import { setUser } from "@/store/actions/UserActions"

const data = {
  navMain: [
    {
      title: "Students",
      url: "#",
      icon: UsersIcon,
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
          title: "Salery",
          url: "/admin/students/fees",
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
          url: "/admin/courses/all-courses",
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

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

      useEffect(() => {
          const token = getCookie("authToken");
          if (token) {
              const decodedToken = decodeToken(token as string) as Users;
              if (decodedToken && typeof decodedToken !== "string") {
                  dispatch(setUser(decodedToken));
              }
          }
      }, [dispatch]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || { name: "", email: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
