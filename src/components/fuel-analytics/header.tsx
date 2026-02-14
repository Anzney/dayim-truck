"use client"

import React from 'react'
import { Calendar, Truck, Droplet, MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FuelAnalyticsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 px-6 bg-background/50 backdrop-blur-sm sticky top-0 z-10 border-b">
      <h1 className="text-2xl font-bold tracking-tight">Fleet Fuel Command Center</h1>

      <div className="flex flex-wrap items-center gap-3">
        <Select defaultValue="30days">
          <SelectTrigger className="w-[160px] bg-card h-9 border-muted">
            <Calendar className="mr-2 h-4 w-4 opacity-50" />
            <SelectValue placeholder="Last 30 Days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-vehicles">
          <SelectTrigger className="w-[140px] bg-card h-9 border-muted">
            <Truck className="mr-2 h-4 w-4 opacity-50" />
            <SelectValue placeholder="All Vehicles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-vehicles">All Vehicles</SelectItem>
            <SelectItem value="tr-103">TRK-103</SelectItem>
            <SelectItem value="tr-105">TRK-105</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-fuels">
          <SelectTrigger className="w-[120px] bg-card h-9 border-muted">
            <Droplet className="mr-2 h-4 w-4 opacity-50" />
            <SelectValue placeholder="All Fuels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-fuels">All Fuels</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="petrol">Petrol</SelectItem>
            <SelectItem value="cng">CNG</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-regions">
          <SelectTrigger className="w-[140px] bg-card h-9 border-muted">
            <MapPin className="mr-2 h-4 w-4 opacity-50" />
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-regions">All Regions</SelectItem>
            <SelectItem value="north">North</SelectItem>
            <SelectItem value="south">South</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative group">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="Search by driver, vehicle ID..."
            className="pl-9 w-[220px] bg-card h-9 border-muted focus-visible:ring-primary"
          />
        </div>
      </div>
    </div>
  )
}

export default FuelAnalyticsHeader
