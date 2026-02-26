"use client"
import React from 'react'
import ThemeSwitcher from "./theme-switcher"
import NotificationPopover from "./notification-popover"
import { usePathname } from 'next/navigation'
import { routes } from './app-sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'

const AppHeader = () => {
  const pathname = usePathname()
  const currentRoute = routes.find(r => r.href === pathname)
  const title = currentRoute?.title || "Dashboard"

  return (
    <div className='h-14 border-b w-full flex justify-between items-center px-4'>
      <div className='flex items-center gap-4'>
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-lg">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='flex items-center gap-4'>
        <ThemeSwitcher />
        <NotificationPopover />
        <div className='border rounded-full p-2 text-sm'>
          US
        </div>
      </div>
    </div>
  )
}

export default AppHeader