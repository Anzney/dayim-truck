import { LayoutDashboard, MapPinned, BotMessageSquare, Headset, Fuel, Settings, Wrench, Users, Truck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface Route {
  id: number;
  icon: React.ReactNode;
  href: string;
}

const routes: Route[] = [
  {
    id: 1,
    icon: <LayoutDashboard className='size-5' />,
    href: "/"
  },
  {
    id: 2,
    icon: <MapPinned className='size-5' />,
    href: "/live-tracking"
  },
  {
    id: 3,
    icon: <Fuel className='size-5 text-[#22d3ee]' />,
    href: "/fuel-&-costs"
  },
  {
    id: 4,
    icon: <BotMessageSquare className="size-5" />,
    href: "/dayimGPT"
  },
  {
    id: 9,
    icon: <Wrench className='size-5 text-[#8b5cf6]' />,
    href: "/maintenance"
  },
  {
    id: 5,
    icon: <Truck className='size-5 text-[#f59e0b]' />,
    href: "/fleet-operations"
  },
  {
    id: 8,
    icon: <Users className='size-5 text-[#10b981]' />,
    href: "/drivers"
  },
  {
    id: 6,
    icon: <Headset className='size-5 text-[#3b82f6]' />,
    href: "/customer-support"
  },
  {
    id: 7,
    icon: <Settings className='size-5 text-gray-400' />,
    href: "/reports-&-settings"
  }
]

const AppSidebar = () => {
  return (
    <div className='w-16 border-r h-screen px-2'>
      <Image src="/dayim-logo.jpeg" height={30} width={30} className='mt-4 ml-2' alt="Dayim Logo" />
      <div className='py-8 w-full flex flex-col items-center gap-5'>
        {
          routes.map((item) => {
            return (
              <Button key={item.id} variant="ghost" size="icon" asChild>
                <Link href={item.href}>
                  {item.icon}
                </Link>
              </Button>
            )
          })
        }
      </div>
    </div>
  )
}

export default AppSidebar