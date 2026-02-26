import { LayoutDashboard, MapPinned, BotMessageSquare, Headset, Fuel, Settings, Wrench, Users, Truck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface Route {
  id: number;
  icon: React.ReactNode;
  href: string;
  title: string;
}

export const routes: Route[] = [
  {
    id: 1,
    icon: <LayoutDashboard className='size-5' />,
    href: "/",
    title: "Dashboard"
  },
  {
    id: 2,
    icon: <MapPinned className='size-5' />,
    href: "/live-tracking",
    title: "Live Tracking"
  },
  {
    id: 3,
    icon: <Fuel className='size-5 text-[#22d3ee]' />,
    href: "/fuel-&-costs",
    title: "Fuel & Costs"
  },
  {
    id: 4,
    icon: <BotMessageSquare className="size-5" />,
    href: "/dayimGPT",
    title: "Dayim GPT"
  },
  {
    id: 9,
    icon: <Wrench className='size-5 text-[#8b5cf6]' />,
    href: "/maintenance",
    title: "Maintenance"
  },
  {
    id: 5,
    icon: <Truck className='size-5 text-[#f59e0b]' />,
    href: "/fleet-operations",
    title: "Fleet Operations"
  },
  {
    id: 8,
    icon: <Users className='size-5 text-[#10b981]' />,
    href: "/drivers",
    title: "Drivers"
  },
  {
    id: 6,
    icon: <Headset className='size-5 text-[#3b82f6]' />,
    href: "/customer-support",
    title: "Support"
  },
  {
    id: 7,
    icon: <Settings className='size-5 text-gray-400' />,
    href: "/reports-&-settings",
    title: "Settings"
  }
]

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader as ShadcnSidebarHeader,
} from "@/components/ui/sidebar"

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <ShadcnSidebarHeader className="p-4 flex h-16 items-center flex-row space-x-2">
        <Image src="/dayim-logo.jpeg" height={30} width={30} alt="Dayim Logo" className="rounded-sm" />
        <span className="font-bold text-lg truncate group-data-[collapsible=icon]:hidden">Dayim Truck</span>
      </ShadcnSidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar