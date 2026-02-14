"use client"

import { useId, useState } from "react"
import {
  ChevronDownIcon,
  Filter,
  LucideIcon,
} from "lucide-react"

import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "./ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"

interface VehicleFilterItem {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface VehicleNumberFilterProps {
  items?: VehicleFilterItem[];
  value?: string;
  onValueChange: (newValue: string) => void;
}

const VehicleNumberFilter = ({ items = [], value = "", onValueChange }: VehicleNumberFilterProps) => {
  const id = useId()
  const [open, setOpen] = useState(false)

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            size="default"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-2">
                {(() => {
                  const selectedItem = items.find(
                    (item) => item.value === value
                  )
                  if (selectedItem) {
                    const Icon = selectedItem.icon
                    return <Icon className="text-muted-foreground size-4" />
                  }
                  return null
                })()}
                <span className="truncate">
                  {items.find((item) => item.value === value)?.label}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground flex gap-2 items-center">
                <Filter className="size-4" />
                Filter By Vehicle No.
              </span>
            )}
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command className="w-full">
            <CommandInput placeholder="Search vehicles..." className="w-full" />
            <CommandList className="w-full">
              <CommandEmpty>No vehicle found.</CommandEmpty>
              <CommandGroup className="w-full">
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      handleValueChange(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {item.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default VehicleNumberFilter
