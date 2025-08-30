import { LayoutDashboard, MapPinned, BotMessageSquare, Headset } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const routes = [
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
    icon: <BotMessageSquare className="size-5" />,
    href: "/dayimGPT"
  },
  {
    id: 4,
    icon: <Headset className='size-5' />,
    href: "/customer-support"
  }
]

const AppSidebar = () => {
  return (
    <div className='w-16 border-r h-screen px-2'>
      <Image src="/dayim-logo.jpeg" height={30} width={30} className='mt-4 ml-2' />
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