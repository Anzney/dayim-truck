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

const LiveTrackingPage = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVehicles, setSelectedVehicles] = useState(new Set())
  const [viewState, setViewState] = useState({
    longitude: 46.6753,   // Riyadh longitude
    latitude: 24.7136,    // Riyadh latitude
    zoom: 8               // much broader view to show more area
  })
  
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [vehicleNumberFilter, setVehicleNumberFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const { theme, resolvedTheme } = useTheme()

  const mapRef = useRef()

  // Determine if dark mode is active
  const isDarkMode = resolvedTheme === 'dark'

  // Fetch live data
  const fetchLiveData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await liveDataAPI.getFormattedLiveData()
      
      console.log('Raw API data:', data)
      
      // Ensure data is an array
      const vehiclesArray = Array.isArray(data) ? data : [data]
      
      console.log('Vehicles array:', vehiclesArray)
      
      // Filter out vehicles with invalid coordinates
      const validVehicles = vehiclesArray.filter(vehicle => 
        vehicle.latitude && 
        vehicle.longitude && 
        !isNaN(parseFloat(vehicle.latitude)) && 
        !isNaN(parseFloat(vehicle.longitude))
      )
      
      console.log('Valid vehicles:', validVehicles)
      
      setVehicles(validVehicles)
      
      // Update map center based on vehicles using the new function
      updateMapView(validVehicles)
    } catch (err) {
      console.error('Error fetching live data:', err)
      setError('Failed to load vehicle data. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchLiveData()
  }, [fetchLiveData])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveData()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [fetchLiveData])

  const onMapClick = useCallback((event) => {
    setSelectedVehicle(null)
  }, [])

  const onMarkerClick = useCallback((event, vehicle) => {
    event.originalEvent.stopPropagation()
    setSelectedVehicle(vehicle)
  }, [])

  // Handle checkbox selection
  const handleVehicleSelect = (vehicleId) => {
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

  // Helper functions for data formatting
  const getVehicleStatus = (ignition, speed) => {
    const speedNum = parseFloat(speed)
    if (ignition === "0") return "Offline"
    if (speedNum === 0) return "Idle"
    if (speedNum > 0 && speedNum < 5) return "Stopped"
    return "Running"
  }

  const getStatusColor = (ignition, speed) => {
    const speedNum = parseFloat(speed)
    if (ignition === "0") return "bg-gray-500"
    if (speedNum === 0) return "bg-yellow-500"
    if (speedNum > 0 && speedNum < 5) return "bg-orange-500"
    return "bg-green-500"
  }

  // Process vehicle data to create filter options
  const vehicleNumberOptions = useMemo(() => {
    const uniqueVehicles = vehicles.reduce((acc, vehicle) => {
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

  // Filter vehicles based on selected filters
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
        const status = getVehicleStatus(vehicle.ignition, vehicle.speed)
        return status.toLowerCase() === statusFilter.toLowerCase()
      })
    }

    return filtered
  }, [vehicles, vehicleNumberFilter, statusFilter])

  // Function to update map view based on filtered vehicles
  const updateMapView = useCallback((filteredVehicles) => {
    if (filteredVehicles.length === 0) {
      setViewState(prev => ({
        ...prev,
        longitude: 46.7167,
        latitude: 24.6333,
        zoom: 8,
        transitionDuration: 1000
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
        zoom: 10,
        transitionDuration: 1000
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
      zoom: zoom,
      transitionDuration: 1000
    }))
  }, [])



  // Update map view when filters change
  useEffect(() => {
    updateMapView(filteredVehicles)
  }, [filteredVehicles, updateMapView])

  // Loading state
  if (loading && vehicles.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center">
          <Loader className='animate-spin'/>
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
          <Button onClick={fetchLiveData} className="bg-blue-600 hover:bg-blue-700">
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
              <SelectContent>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="idle">Idle</SelectItem>
                  <SelectItem value="stopped">Stopped</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
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

      <div className='flex gap-10'>
        {/* Left Panel - Vehicle List (40% width) */}
        <div className="w-2/5 border-r rounded-r-lg flex flex-col h-[calc(100vh-240px)]">
          {/* Table Header */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-neutral-900 rounded-tr-lg border-b border-t">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={selectedVehicles.size === filteredVehicles.length && filteredVehicles.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mr-2"
                />
                Vehicle No
              </div>
              <div>Track DateTime</div>
              <div>Speed</div>
              <div>Ignition</div>
              <div>Weight</div>
              <div>Door</div>
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
                    className={`px-4 py-3 border-b hover:bg-gray-50 dark:hover:bg-neutral-900 cursor-pointer transition-colors ${
                      isSelected ? 'bg-green-50 border-green-200' : ''
                    }`}
                    onClick={() => {
                      setSelectedVehicle(vehicle)
                      // Focus map on the selected vehicle
                      setViewState(prev => ({
                        ...prev,
                        longitude: parseFloat(vehicle.longitude),
                        latitude: parseFloat(vehicle.latitude),
                        zoom: 8,
                        transitionDuration: 800
                      }))
                    }}
                  >
                    <div className="grid grid-cols-6 gap-4 items-center text-sm">
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
                        <span className="font-medium ">{vehicle.vehicleNo || `KWS${vehicle.vehicleId.slice(-4)}`}</span>
                      </div>
                      
                      {/* Track DateTime */}
                      <div className="">
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
                        <span className={parseFloat(vehicle.speed) > 0 ? 'text-green-600 font-medium' : ''}>
                          {vehicle.speed || '0'} km/h
                        </span>
                      </div>
                      
                      {/* Ignition */}
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${vehicle.ignition === "1" ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="">{vehicle.ignition === "1" ? 'On' : 'Off'}</span>
                      </div>
                      
                      {/* Weight */}
                      <div className="">
                        {vehicle.weight ? `${vehicle.weight} kg` : 'N/A'}
                      </div>
                      
                      {/* Door */}
                      <div className="flex items-center">
                        <span className={`font-medium ${vehicle.door === "Open" ? 'text-red-600' : 'text-green-600'}`}>
                          {vehicle.door || 'Closed'}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Panel - Map (60% width) */}
        <div className="flex-1 relative pr-10 pb-8 rounded-4xl">
          <Map
            ref={mapRef}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            onClick={onMapClick}
            mapStyle={isDarkMode 
              ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
              : "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
            }
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
                    <div className={`relative w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform transition-all duration-200 hover:scale-110 ${
                      isSelected 
                        ? 'bg-green-500 ring-2 ring-green-300' 
                        : 'bg-blue-500'
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
                          className={`${
                            getVehicleStatus(selectedVehicle.ignition, selectedVehicle.speed) === 'Running' 
                              ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                              : getVehicleStatus(selectedVehicle.ignition, selectedVehicle.speed) === 'Idle'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
                              : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
                          }`}
                        >
                          {getVehicleStatus(selectedVehicle.ignition, selectedVehicle.speed)}
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
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
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
