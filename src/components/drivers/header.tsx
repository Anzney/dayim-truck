import React from 'react'
import { Search, Bell, Download, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const DriverHeader = ({ onAddClick }: { onAddClick: () => void }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-foreground">Drivers & Performance</h1>
      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles, drivers..."
            className="pl-10 bg-card border text-foreground h-10 rounded-xl"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-card border hover:bg-accent flex items-center gap-2 h-10 px-4 rounded-xl">
            <Download className="size-4" />
            Export
          </Button>
          <Button
            onClick={onAddClick}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold flex items-center gap-2 h-10 px-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <Plus className="size-4" />
            Add Driver
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DriverHeader
