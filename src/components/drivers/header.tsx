import React from 'react'
import { Search, Bell, Download, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const DriverHeader = () => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles, drivers..."
            className="pl-10 bg-card border text-foreground"
          />
        </div>
        <div className="relative">
          <Bell className="size-6 text-foreground cursor-pointer" />
          <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full"></span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Drivers & Performance</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-card border hover:bg-accent flex items-center gap-2">
            <Download className="size-4" />
            Export
          </Button>
          <Button className="bg-[#00D1FF] hover:bg-[#00B8E1] text-black font-semibold flex items-center gap-2">
            <Plus className="size-4" />
            Add Driver
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DriverHeader
