import { Search, Briefcase, User, FileText, Settings, Home } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const menuItems = [
  {
    title: "Dashboard",
    url: "/candidate/dashboard",
    icon: Home,
  },
  {
    title: "Browse Jobs",
    url: "/candidate/jobs",
    icon: Search,
  },
  {
    title: "My Applications",
    url: "/candidate/applications",
    icon: FileText,
  },
  {
    title: "Profile",
    url: "/candidate/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/candidate/settings",
    icon: Settings,
  },
]

export function CandidateSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2 py-2">
          <Briefcase className="h-6 w-6 text-indigo-600" />
          <span className="font-semibold">Candidate Portal</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 py-2 text-sm text-muted-foreground">Agentic AI Hiring Assistant</div>
      </SidebarFooter>
    </Sidebar>
  )
}
