"use client"
import React from 'react'
import ThemeSwitcher  from "../components/theme-switcher"
import NotificationPopover from "./notification-popover"

const AppHeader = () => {
  return (
    <div className='h-14 border-b w-full flex justify-between items-center px-6'>
      <p className="  font-bold text-lg">Dashboard</p>
      <div className='flex items-center gap-4'>
        <ThemeSwitcher />
        <NotificationPopover />
        <div className='border rounded-full p-2'>
          US
        </div>
      </div>
    </div>
  )
}

export default AppHeader