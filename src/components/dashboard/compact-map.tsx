'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Truck } from 'lucide-react'
import liveDataAPI from '../../lib/livedata'
import Link from 'next/link'
import { Vehicle } from '@/types/vehicle'

const CompactMap = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [viewState, setViewState] = useState({
    longitude: 46.6753,   // Riyadh longitude
    latitude: 24.7136,    // Riyadh latitude
    zoom: 8               // broader view to show more area
  })
  const mapRef = useRef<any>()

  // Function to update map view based on vehicles
  const updateMapView = useCallback((validVehicles: Vehicle[]) => {
    if (validVehicles.length === 0) {
      setViewState(prev => ({
        ...prev,
        longitude: 46.7167,
        latitude: 24.6333,
        zoom: 8
      }))
      return
    }

    // Multiple vehicles - calculate bounds to show all vehicles
    const lats = validVehicles.map(v => parseFloat(v.latitude))
    const lngs = validVehicles.map(v => parseFloat(v.longitude))

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

      // Update map center based on vehicles
      updateMapView(validVehicles)
    } catch (err) {
      console.error('Error fetching live data:', err)
    } finally {
      setLoading(false)
    }
  }, [updateMapView])

  // Initial data fetch
  useEffect(() => {
    fetchLiveData()
  }, [fetchLiveData])

  // Auto-refresh every 60 seconds (less frequent than main page)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveData()
    }, 60000) // 60 seconds

    return () => clearInterval(interval)
  }, [fetchLiveData])

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

  return (
    <div className='rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl overflow-hidden h-full flex flex-col'>
      {/* Header */}
      <div className='p-4 border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-lg'>Live Tracking</h3>
          <Link className='underline text-sm font-semibold tracking-tight' href="/live-tracking">See All</Link>
        </div>
      </div>

      {/* Map */}
      <div className='flex-1 relative min-h-[40vh] p-4 pt-0 rounded-2xl'>
        {loading && vehicles.length === 0 ? (
          <div className="flex items-center justify-center h-[40vh] max-h-[40vh]">
            <div className="flex flex-col items-center">
              <Truck className='animate-pulse w-8 h-8 text-gray-400' />
              <p className="text-sm text-gray-500 mt-2">Loading vehicles...</p>
            </div>
          </div>
        ) : (
          <Map
            ref={mapRef}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '40vh',
              borderRadius: "18px"
            }}
          >
            {vehicles.map((vehicle) => (
              <Marker
                key={vehicle.vehicleId}
                longitude={parseFloat(vehicle.longitude)}
                latitude={parseFloat(vehicle.latitude)}
                anchor="bottom"
              >
                <div className="relative group cursor-pointer">
                  {/* Main marker */}
                  <div className={`relative w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform transition-all duration-200 hover:scale-125 ${getStatusColor(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime)}`}>
                    <Truck className="w-3 h-3 text-white" />
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {vehicle.vehicleNo || `KWS${vehicle.vehicleId.slice(-4)}`} - {getVehicleStatus(vehicle.ignition, vehicle.speed, vehicle.TrackDateTime)}
                  </div>
                </div>
              </Marker>
            ))}

            <NavigationControl position="bottom-right" showCompass={false} />
          </Map>
        )}

        <div className='flex items-center gap-4 justify-between absolute top-4 left-8 px-4 rounded-xl h-10 z-20 flex-shrink-0 bg-white '>
          <div className='rounded-lg flex gap-4'>
            <div className='flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-[#10B981]'></div>
              <p className='  text-xs tracking-tight'>Running</p>
            </div>

            <div className='flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-amber-400'></div>
              <p className='  text-xs tracking-tight'>Idle</p>
            </div>

            <div className='flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-gray-400'></div>
              <p className='  text-xs tracking-tight'>Stopped</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompactMap
