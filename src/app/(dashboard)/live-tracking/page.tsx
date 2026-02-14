'use client'

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import Map, { Marker, NavigationControl, FullscreenControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Truck, MapPin, RefreshCw, Filter, X, Loader } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import liveDataAPI from '../../../lib/livedata'
import { useTheme } from 'next-themes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

import VehicleNumberFilter from "../../../components/vehicle-number-filter"
import { Vehicle } from '@/types/vehicle'

const LiveTrackingPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVehicles, setSelectedVehicles] = useState<Set<string>>(new Set())
  const [viewState, setViewState] = useState({
    longitude: 46.6753,   // Riyadh longitude
    latitude: 24.7136,    // Riyadh latitude
    zoom: 8               // much broader view to show more area
  })

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [vehicleNumberFilter, setVehicleNumberFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const { theme, resolvedTheme } = useTheme()

  const mapRef = useRef<any>(null)

  // Determine if dark mode is active
  const isDarkMode = resolvedTheme === 'dark'

  // Helper functions for data formatting
  const getVehicleStatus = (ignition: string, speed: string, trackDateTime: string) => {
    const speedNum = parseFloat(speed)

    // Check if vehicle is offline based on ignition, speed, and time conditions
    if (ignition === "0" && speedNum === 0) {
      if (!trackDateTime) return "Offline"

      const trackDate = new Date(trackDateTime)
      const currentDate = new Date()
      const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
      const trackDay = new Date(trackDate.getFullYear(), trackDate.getMonth(), trackDate.getDate())

      // Check if data is not from today
      if (trackDay.getTime() !== today.getTime()) {
        return "Offline"
      }

      // Check if data is older than 10 minutes
      const timeDifferenceInMinutes = (currentDate.getTime() - trackDate.getTime()) / (1000 * 60)
      if (timeDifferenceInMinutes > 10) {
        return "Offline"
      }
    }

    if (speedNum === 0 && ignition === "1") return "Idle"
    if (speedNum === 0 && ignition === "0") return "Stopped"
    return "Running"
  }

  const getStatusColor = (ignition: string, speed: string, trackDateTime: string) => {
    const status = getVehicleStatus(ignition, speed, trackDateTime)
    if (status === "Offline") return "bg-gray-500"
    if (status === "Idle") return "bg-yellow-500"
    if (status === "Stopped") return "bg-red-500"
    return "bg-green-500"
  }

  // Filter and sort vehicles based on selected filters
  const filteredVehicles = useMemo(() => {
    let filtered = vehicles

    // Filter by vehicle number
    if (vehicleNumberFilter) {
      filtered = filtered.filter(vehicle => {
        const vehicleNo = vehicle.vehicleNo || `KWS${vehicle.vehicleId.slice(-4)}`
        return vehicleNo === vehicleNumberFilter
      })
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(vehicle => {
        const status = getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime)
        return status.toLowerCase() === statusFilter.toLowerCase()
      })
    }

    // Sort by status priority: Running > Idle > Stopped > Offline
    const statusPriority: Record<string, number> = {
      'Running': 1,
      'Idle': 2,
      'Stopped': 3,
      'Offline': 4
    }

    filtered = [...filtered].sort((a, b) => {
      const statusA = getVehicleStatus(a.ignition, a.speed, a.TrackDateTime)
      const statusB = getVehicleStatus(b.ignition, b.speed, b.TrackDateTime)
      const priorityA = statusPriority[statusA] || 5
      const priorityB = statusPriority[statusB] || 5

      // Primary sort by status priority
      if (priorityA !== priorityB) {
        return priorityA - priorityB
      }

      // Secondary sort by vehicle number for consistent ordering within same status
      const vehicleNoA = a.vehicleNo || `KWS${a.vehicleId.slice(-4)}`
      const vehicleNoB = b.vehicleNo || `KWS${b.vehicleId.slice(-4)}`
      return vehicleNoA.localeCompare(vehicleNoB)
    })

    return filtered
  }, [vehicles, vehicleNumberFilter, statusFilter])

  // Function to update map view based on filtered vehicles
  const updateMapView = useCallback((filteredVehicles: Vehicle[]) => {
    if (filteredVehicles.length === 0) {
      setViewState(prev => ({
        ...prev,
        longitude: 46.7167,
        latitude: 24.6333,
        zoom: 8
      }))
      return
    }

    if (filteredVehicles.length === 1) {
      // Single vehicle - center on it with moderate zoom
      const vehicle = filteredVehicles[0]
      setViewState(prev => ({
        ...prev,
        longitude: parseFloat(vehicle.longitude),
        latitude: parseFloat(vehicle.latitude),
        zoom: 10
      }))
      return
    }

    // Multiple vehicles - calculate bounds to show all vehicles
    const lats = filteredVehicles.map(v => parseFloat(v.latitude))
    const lngs = filteredVehicles.map(v => parseFloat(v.longitude))

    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)

    const centerLat = (minLat + maxLat) / 2
    const centerLng = (minLng + maxLng) / 2

    // Calculate appropriate zoom level based on the spread of vehicles
    const latDiff = maxLat - minLat
    const lngDiff = maxLng - minLng
    const maxDiff = Math.max(latDiff, lngDiff)

    let zoom = 6 // default zoom (much broader view)
    if (maxDiff > 10) zoom = 5
    else if (maxDiff > 5) zoom = 5
    else if (maxDiff > 2) zoom = 6
    else if (maxDiff > 0.5) zoom = 8
    else if (maxDiff > 0.1) zoom = 10
    else zoom = 12

    setViewState(prev => ({
      ...prev,
      longitude: centerLng,
      latitude: centerLat,
      zoom: zoom
    }))
  }, [])

  // Fetch live data
  const fetchLiveData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await liveDataAPI.getFormattedLiveData()

      // Ensure data is an array
      const vehiclesArray = Array.isArray(data) ? data : [data]

      // Filter out vehicles with invalid coordinates
      const validVehicles = vehiclesArray.filter(vehicle =>
        vehicle.latitude &&
        vehicle.longitude &&
        !isNaN(parseFloat(vehicle.latitude)) &&
        !isNaN(parseFloat(vehicle.longitude))
      )

      setVehicles(validVehicles)
      updateMapView(validVehicles)
    } catch (err) {
      console.error('Error fetching live data:', err)
      setError('Failed to load vehicle data. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [updateMapView])

  // Initial data fetch
  useEffect(() => {
    fetchLiveData()
  }, [fetchLiveData])

  // Auto-refresh every 30 second
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveData()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [fetchLiveData])

  const onMapClick = useCallback(() => {
    setSelectedVehicle(null)
  }, [])

  const onMarkerClick = useCallback((event: any, vehicle: Vehicle) => {
    event.originalEvent.stopPropagation()
    setSelectedVehicle(vehicle)
  }, [])

  // Handle checkbox selection
  const handleVehicleSelect = (vehicleId: string) => {
    const newSelected = new Set(selectedVehicles)
    if (newSelected.has(vehicleId)) {
      newSelected.delete(vehicleId)
    } else {
      newSelected.add(vehicleId)
    }
    setSelectedVehicles(newSelected)
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedVehicles.size === filteredVehicles.length) {
      setSelectedVehicles(new Set())
    } else {
      setSelectedVehicles(new Set(filteredVehicles.map(v => v.vehicleId)))
    }
  }

  // Process vehicle data to create filter options
  const vehicleNumberOptions = useMemo(() => {
    const uniqueVehicles = vehicles.reduce((acc: any[], vehicle) => {
      const vehicleNo = vehicle.vehicleNo || `KWS${vehicle.vehicleId.slice(-4)}`
      if (!acc.find(item => item.value === vehicleNo)) {
        acc.push({
          value: vehicleNo,
          label: vehicleNo,
          icon: Truck
        })
      }
      return acc
    }, [])

    return uniqueVehicles.sort((a, b) => a.label.localeCompare(b.label))
  }, [vehicles])

  // Update map view when filters change
  useEffect(() => {
    updateMapView(filteredVehicles)
  }, [filteredVehicles, updateMapView])

  // Loading state
  if (loading && vehicles.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center">
          <Loader className='animate-spin' />
          <p className="text-gray-600">Loading vehicle data...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && vehicles.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button variant="default" size="default" className="bg-blue-600 hover:bg-blue-700" onClick={fetchLiveData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      {/* Header */}
      <div className="p-4 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Live Tracking</h1>
            <p className="text-sm text-muted-foreground">Real-time vehicle monitoring</p>
          </div>
          <div className='flex items-center gap-4'>
            <Button
              onClick={fetchLiveData}
              disabled={loading}
              variant="default"
              size="sm"
              className="hover:bg-gray-700 dark:hover:bg-gray-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className='size-5' />
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="running" className="w-full">Running</SelectItem>
                <SelectItem value="idle" className="w-full">Idle</SelectItem>
                <SelectItem value="stopped" className="w-full">Stopped</SelectItem>
                <SelectItem value="offline" className="w-full">Offline</SelectItem>
              </SelectContent>
            </Select>
            <VehicleNumberFilter
              items={vehicleNumberOptions}
              value={vehicleNumberFilter}
              onValueChange={setVehicleNumberFilter}
            />
            {(vehicleNumberFilter || statusFilter) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setVehicleNumberFilter("")
                  setStatusFilter("")
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}

          </div>
        </div>
      </div>

      {/* Vehicle Summary */}
      <div className="mx-4 mb-4">
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''} visible
              </span>
            </div>
            {vehicleNumberFilter && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Filtered: {vehicleNumberFilter}
              </Badge>
            )}
            {statusFilter && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Status: {statusFilter}
              </Badge>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {filteredVehicles.length > 0 ? (
              `Showing ${filteredVehicles.length} of ${vehicles.length} total vehicles`
            ) : (
              'No vehicles match current filters'
            )}
          </div>
        </div>
      </div>

      <div className='flex gap-5 px-5'>
        {/* Left Panel - Vehicle List (40% width) */}
        <div className="w-[45%] border rounded-lg flex flex-col h-[calc(100vh-240px)]">
          {/* Table Header */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-neutral-900 rounded-lg">
            <div className="grid grid-cols-5 gap-5 text-sm font-medium">
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  checked={selectedVehicles.size === filteredVehicles.length && filteredVehicles.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mr-2"
                />
                <p className='shrink-0'>Vehicle No</p>
              </div>
              <div>Updated At</div>
              <div>Speed</div>
              <div>Weight</div>
              <div>Status</div>
            </div>
          </div>

          {/* Vehicle List */}
          <div className="flex-1 overflow-y-auto">
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {vehicles.length === 0 ? "No vehicles found" : "No vehicles match the selected filters"}
                </p>
              </div>
            ) : (
              filteredVehicles.map((vehicle) => {
                const isSelected = selectedVehicles.has(vehicle.vehicleId)

                return (
                  <div
                    key={vehicle.vehicleId}
                    className={`px-4 py-3 border-b cursor-pointer transition-all duration-300 ${selectedVehicle?.vehicleId === vehicle.vehicleId
                      ? `transform z-10 relative ${getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime) === 'Running'
                        ? 'bg-green-500 border-green-600 text-white'
                        : getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime) === 'Idle'
                          ? 'bg-yellow-500 border-yellow-600 text-white'
                          : getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime) === 'Stopped'
                            ? 'bg-red-500 border-red-500 text-white'
                            : 'bg-gray-400 border-gray-400 text-white'
                      }`
                      : isSelected
                        ? 'bg-green-50 border-green-200 hover:bg-green-100'
                        : 'hover:bg-gray-50 dark:hover:bg-neutral-900'
                      }`}
                    onClick={() => {
                      setSelectedVehicle(vehicle)
                      // Focus map on the selected vehicle
                      setViewState(prev => ({
                        ...prev,
                        longitude: parseFloat(vehicle.longitude),
                        latitude: parseFloat(vehicle.latitude),
                        zoom: 8
                      }))
                    }}
                  >
                    <div className="grid grid-cols-5 gap-6 items-center text-sm">
                      {/* Vehicle No */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation()
                            handleVehicleSelect(vehicle.vehicleId)
                          }}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mr-2"
                        />
                        <span className="font-medium shrink-0 text-sm">{vehicle.vehicleNo || `KWS${vehicle.vehicleId.slice(-4)}`}</span>
                      </div>

                      {/* Track DateTime */}
                      <div className="text-sm">
                        {vehicle.TrackDateTime ?
                          new Date(vehicle.TrackDateTime).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'
                        }
                      </div>

                      {/* Speed */}
                      <div className="">
                        <span className={`${selectedVehicle?.vehicleId === vehicle.vehicleId
                          ? 'text-white font-medium text-sm'
                          : parseFloat(vehicle.speed) > 0
                            ? 'text-green-600 font-medium text-sm'
                            : ''
                          }`}>
                          {vehicle.speed || '0'} km/h
                        </span>
                      </div>

                      {/* Weight */}
                      <div className="">
                        {vehicle.weight ? `${vehicle.weight} kg` : 'N/A'}
                      </div>

                      {/* Status */}
                      <div>
                        <Badge
                          variant="default"
                          className={`
                            text-xs font-medium px-2 py-1 rounded-md border
                            ${selectedVehicle?.vehicleId === vehicle.vehicleId
                              ? 'text-white bg-white/20 border-white/30'
                              : getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime) === 'Running'
                                ? 'text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800'
                                : getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime) === 'Idle'
                                  ? 'text-yellow-700 bg-yellow-100 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800'
                                  : getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime) === 'Stopped'
                                    ? 'text-red-700 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800'
                                    : 'text-gray-700 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-700'
                            }
                          `}
                        >
                          {getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Panel - Map (60% width) */}
        <div className="flex-1 relative rounded-4xl">
          <Map
            ref={mapRef}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            onClick={onMapClick}
            mapStyle={"https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '32px',
              overflow: 'hidden'
            }}
          >
            {filteredVehicles.map((vehicle) => {
              const isSelected = selectedVehicle?.vehicleId === vehicle.vehicleId

              return (
                <Marker
                  key={`${vehicle.vehicleId}-${vehicleNumberFilter}-${statusFilter}`}
                  longitude={parseFloat(vehicle.longitude)}
                  latitude={parseFloat(vehicle.latitude)}
                  anchor="bottom"
                  onClick={(event) => onMarkerClick(event, vehicle)}
                >
                  <div className={`relative group cursor-pointer ${isSelected ? 'z-10' : 'z-0'}`}>
                    {/* Main marker */}
                    <div className={`relative w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform transition-all duration-200 hover:scale-110 ${isSelected
                      ? `${getStatusColor(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime)} ring-2 ring-opacity-50 ${getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime) === 'Running' ? 'ring-green-300' :
                        getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime) === 'Idle' ? 'ring-yellow-300' :
                          getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime) === 'Stopped' ? 'ring-red-300' :
                            'ring-gray-300'
                      }`
                      : getStatusColor(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime)
                      }`}>
                      <Truck className="w-4 h-4 text-white" />
                    </div>

                    {/* Vehicle ID */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-1 rounded border border-gray-200 dark:border-gray-600 w-17">
                      {vehicle.vehicleNo ? vehicle.vehicleNo : vehicle.vehicleId}
                    </div>
                  </div>
                </Marker>
              )
            })}

            {selectedVehicle && (
              <Marker
                key={`selected-${selectedVehicle.vehicleId}`}
                longitude={parseFloat(selectedVehicle.longitude)}
                latitude={parseFloat(selectedVehicle.latitude)}
                anchor="bottom"
              >
                <Popover open={!!selectedVehicle} onOpenChange={(open) => !open && setSelectedVehicle(null)}>
                  <PopoverTrigger asChild>
                    <div className="w-0 h-0" />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 p-0 border-0 shadow-xl"
                    side="top"
                    align="center"
                    sideOffset={10}
                  >
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Truck className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                              {selectedVehicle.vehicleNo || `KWS${selectedVehicle.vehicleId.slice(-4)}`}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Vehicle ID: {selectedVehicle.vehicleId}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${getVehicleStatus(selectedVehicle.ignition, selectedVehicle.speed, selectedVehicle.TrackDateTime) === 'Running'
                            ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                            : getVehicleStatus(selectedVehicle.ignition, selectedVehicle.speed, selectedVehicle.TrackDateTime) === 'Idle'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
                              : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
                            }`}
                        >
                          {getVehicleStatus(selectedVehicle.ignition, selectedVehicle.speed, selectedVehicle.TrackDateTime)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${selectedVehicle.ignition === "1" ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">IGNITION</span>
                          </div>
                          <span className={`text-sm font-semibold ${selectedVehicle.ignition === "1" ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedVehicle.ignition === "1" ? 'ON' : 'OFF'}
                          </span>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">SPEED</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {selectedVehicle.speed || '0'} km/h
                          </span>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">WEIGHT</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {selectedVehicle.weight || 'N/A'} kg
                          </span>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${selectedVehicle.door === "Open" ? 'bg-red-500' : 'bg-green-500'}`}></div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">DOOR</span>
                          </div>
                          <span className={`text-sm font-semibold ${selectedVehicle.door === "Open" ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedVehicle.door || 'CLOSED'}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="default" size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </Marker>
            )}

            <NavigationControl position="bottom-right" />
            <FullscreenControl position="bottom-right" />
          </Map>
        </div>
      </div>
    </div>
  )
}

export default LiveTrackingPage
