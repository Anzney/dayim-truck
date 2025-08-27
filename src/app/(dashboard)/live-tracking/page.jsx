'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Truck, MapPin, RefreshCw } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import liveDataAPI from '../../../lib/livedata'

const LiveTrackingPage = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVehicles, setSelectedVehicles] = useState(new Set())
  const [viewState, setViewState] = useState({
    longitude: 49.6414216000,
    latitude: 27.0203466000,
    zoom: 12
  })
  
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const mapRef = useRef()

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
      
      // Update map center based on vehicles
      if (validVehicles.length > 0) {
        if (validVehicles.length === 1) {
          // Single vehicle - center on it
          const vehicle = validVehicles[0]
          setViewState(prev => ({
            ...prev,
            longitude: parseFloat(vehicle.longitude),
            latitude: parseFloat(vehicle.latitude),
            zoom: 12
          }))
        } else {
          // Multiple vehicles - calculate center point
          const lats = validVehicles.map(v => parseFloat(v.latitude))
          const lngs = validVehicles.map(v => parseFloat(v.longitude))
          
          const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2
          const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2
          
          setViewState(prev => ({
            ...prev,
            longitude: centerLng,
            latitude: centerLat,
            zoom: 8 // Zoom out to show all vehicles
          }))
        }
      } else {
        // No valid vehicles - use Saudi Arabia center
        setViewState(prev => ({
          ...prev,
          longitude: 45.0792,
          latitude: 23.8859,
          zoom: 6
        }))
      }
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
    if (selectedVehicles.size === vehicles.length) {
      setSelectedVehicles(new Set())
    } else {
      setSelectedVehicles(new Set(vehicles.map(v => v.vehicleId)))
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

  // Loading state
  if (loading && vehicles.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
    <div className="h-screen flex">
      {/* Left Panel - Vehicle List (40% width) */}
      <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Live Tracking</h1>
              <p className="text-sm text-gray-600">Real-time vehicle monitoring</p>
            </div>
            <Button 
              onClick={fetchLiveData} 
              disabled={loading}
              size="sm"
              className="bg-gray-600 hover:bg-gray-700"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" className="bg-gray-100 border-gray-300 text-gray-700">
              Action
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Type:</span>
              <Button variant="outline" size="sm" className="bg-gray-100 border-gray-300 text-gray-700">
                All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                checked={selectedVehicles.size === vehicles.length && vehicles.length > 0}
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
          {vehicles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No vehicles found</p>
            </div>
          ) : (
            vehicles.map((vehicle) => {
              const isSelected = selectedVehicles.has(vehicle.vehicleId)
              
              return (
                <div 
                  key={vehicle.vehicleId}
                  className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    isSelected ? 'bg-green-50 border-green-200' : ''
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
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
                      <span className="font-medium text-gray-900">{vehicle.vehicleNo || `KWS${vehicle.vehicleId.slice(-4)}`}</span>
                    </div>
                    
                    {/* Track DateTime */}
                    <div className="text-gray-700">
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
                    <div className="text-gray-700">
                      <span className={parseFloat(vehicle.speed) > 0 ? 'text-green-600 font-medium' : 'text-gray-500'}>
                        {vehicle.speed || '0'} km/h
                      </span>
                    </div>
                    
                    {/* Ignition */}
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${vehicle.ignition === "1" ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-gray-700">{vehicle.ignition === "1" ? 'On' : 'Off'}</span>
                    </div>
                    
                    {/* Weight */}
                    <div className="text-gray-700">
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
      <div className="flex-1 relative bg-gray-50">
        <Map
          ref={mapRef}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          onClick={onMapClick}
          mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '0',
            overflow: 'hidden'
          }}
        >
          {vehicles.map((vehicle) => {
            const isSelected = selectedVehicle?.vehicleId === vehicle.vehicleId
            
            return (
              <Marker
                key={vehicle.vehicleId}
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
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 bg-white px-1 rounded">
                    {vehicle.vehicleNo ? vehicle.vehicleNo.slice(-4) : vehicle.vehicleId.slice(-4)}
                  </div>
                </div>
              </Marker>
            )
          })}

          {selectedVehicle && (
            <Popup
              longitude={parseFloat(selectedVehicle.longitude)}
              latitude={parseFloat(selectedVehicle.latitude)}
              anchor="bottom"
              onClose={() => setSelectedVehicle(null)}
              closeButton={true}
              closeOnClick={false}
              className="max-w-sm"
              style={{
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: 'none'
              }}
            >
                              <div className="p-4 bg-white rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-900">
                      {selectedVehicle.vehicleNo || `KWS${selectedVehicle.vehicleId.slice(-4)}`}
                    </h3>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                      {getVehicleStatus(selectedVehicle.ignition, selectedVehicle.speed)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Speed:</span>
                      <span className="text-gray-900 font-medium">{selectedVehicle.speed || '0'} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ignition:</span>
                      <span className={`font-medium ${selectedVehicle.ignition === "1" ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedVehicle.ignition === "1" ? 'On' : 'Off'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Weight:</span>
                      <span className="text-gray-900">{selectedVehicle.weight || 'N/A'} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Door:</span>
                      <span className={`font-medium ${selectedVehicle.door === "Open" ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedVehicle.door || 'Closed'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Vehicle Image Placeholder */}
                  <div className="mt-3 mb-3 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-2">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-gray-600 hover:bg-gray-700 text-white">
                      Detail
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-50">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
            </Popup>
          )}

          <NavigationControl position="bottom-right" />
          <FullscreenControl position="bottom-right" />
        </Map>
      </div>
    </div>
  )
}

export default LiveTrackingPage
