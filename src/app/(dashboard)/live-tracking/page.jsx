'use client'

import React, { useState, useRef, useCallback } from 'react'
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Truck, MapPin, Clock, Gauge, Calendar, Weight, DoorOpen } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'

// Dummy data based on the API structure
const dummyVehicles = [
  {
    vehicleId: "32754",
    vehicleNo: "8950-BGB",
    latitude: 27.0203466000,
    longitude: 49.6414216000,
    TrackDateTime: "2025-08-26 16:46:46",
    location: "Al Jubayl, Al Jubayl Governorate, Eastern Region, 35514, Saudi Arabia",
    speed: "0.00",
    ignition: "0",
    distance: "129465.43",
    expiryDate: "2030-03-16",
    door: "Closed",
    seatbelt: "NA",
    isCanbus: "0",
    weight: "1700.00"
  },
  {
    vehicleId: "32755",
    vehicleNo: "8951-ABC",
    latitude: 27.0253466000,
    longitude: 49.6454216000,
    TrackDateTime: "2025-08-26 16:45:30",
    location: "Al Jubayl Industrial City, Eastern Region, Saudi Arabia",
    speed: "45.50",
    ignition: "1",
    distance: "145230.75",
    expiryDate: "2030-05-20",
    door: "Open",
    seatbelt: "Fastened",
    isCanbus: "1",
    weight: "1850.00"
  },
  {
    vehicleId: "32756",
    vehicleNo: "8952-XYZ",
    latitude: 27.0153466000,
    longitude: 49.6354216000,
    TrackDateTime: "2025-08-26 16:47:15",
    location: "King Fahd Industrial Port, Al Jubayl, Saudi Arabia",
    speed: "0.00",
    ignition: "0",
    distance: "98765.32",
    expiryDate: "2029-12-10",
    door: "Closed",
    seatbelt: "NA",
    isCanbus: "0",
    weight: "2200.00"
  },
  {
    vehicleId: "32757",
    vehicleNo: "8953-DEF",
    latitude: 27.0303466000,
    longitude: 49.6504216000,
    TrackDateTime: "2025-08-26 16:44:20",
    location: "Al Jubayl Commercial District, Eastern Region, Saudi Arabia",
    speed: "35.20",
    ignition: "1",
    distance: "156789.45",
    expiryDate: "2030-08-15",
    door: "Closed",
    seatbelt: "Fastened",
    isCanbus: "1",
    weight: "1950.00"
  },
  {
    vehicleId: "32758",
    vehicleNo: "8954-GHI",
    latitude: 27.0103466000,
    longitude: 49.6304216000,
    TrackDateTime: "2025-08-26 16:48:00",
    location: "Al Jubayl Residential Area, Eastern Region, Saudi Arabia",
    speed: "0.00",
    ignition: "0",
    distance: "112345.67",
    expiryDate: "2030-01-25",
    door: "Closed",
    seatbelt: "NA",
    isCanbus: "0",
    weight: "1600.00"
  }
]

const LiveTrackingPage = () => {
  const [viewState, setViewState] = useState({
    longitude: 49.6414216000,
    latitude: 27.0203466000,
    zoom: 12
  })
  
  // Add custom styles for map
  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0',
    overflow: 'hidden'
  }
  
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const mapRef = useRef()

  const onMapClick = useCallback((event) => {
    setSelectedVehicle(null)
  }, [])

  const onMarkerClick = useCallback((event, vehicle) => {
    event.originalEvent.stopPropagation()
    setSelectedVehicle(vehicle)
  }, [])

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

  const getStatusBadgeColor = (ignition, speed) => {
    const speedNum = parseFloat(speed)
    if (ignition === "0") return "bg-gray-100 text-gray-800 border-gray-200"
    if (speedNum === 0) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    if (speedNum > 0 && speedNum < 5) return "bg-orange-100 text-orange-800 border-orange-200"
    return "bg-green-100 text-green-800 border-green-200"
  }

  // Calculate vehicle counts based on status
  const vehicleCounts = React.useMemo(() => {
    const counts = { running: 0, idle: 0, stopped: 0, offline: 0 }
    dummyVehicles.forEach(vehicle => {
      const status = getVehicleStatus(vehicle.ignition, vehicle.speed)
      if (status === "Running") counts.running++
      else if (status === "Idle") counts.idle++
      else if (status === "Stopped") counts.stopped++
      else if (status === "Offline") counts.offline++
    })
    return counts
  }, [])

  const getSpeedColor = (speed) => {
    const speedNum = parseFloat(speed)
    if (speedNum === 0) return "text-gray-500"
    if (speedNum < 30) return "text-yellow-500"
    if (speedNum < 60) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <div className="h-screen flex">
      {/* Left Panel - Vehicle List */}
      <div className="w-1/3 bg-white border-r overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900  ">Live Tracking</h1>
              <p className="text-gray-600">Hello Chris, welcome back!</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Action
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Running</span>
                </div>
                <p className="text-2xl font-bold mt-2">{vehicleCounts.running}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Idle</span>
                </div>
                <p className="text-2xl font-bold mt-2">{vehicleCounts.idle}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Stopped</span>
                </div>
                <p className="text-2xl font-bold mt-2">{vehicleCounts.stopped}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-sm font-medium">Offline</span>
                </div>
                <p className="text-2xl font-bold mt-2">{vehicleCounts.offline}</p>
              </CardContent>
            </Card>
          </div>

          {/* Vehicle List */}
          <div className="space-y-3">
            {dummyVehicles.map((vehicle) => (
              <Card 
                key={vehicle.vehicleId}
                className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedVehicle?.vehicleId === vehicle.vehicleId ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{vehicle.vehicleNo}</h3>
                        <p className="text-sm text-gray-500">ID: {vehicle.vehicleId}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="secondary"
                        className={getStatusBadgeColor(vehicle.ignition, vehicle.speed)}
                      >
                        {getVehicleStatus(vehicle.ignition, vehicle.speed)}
                      </Badge>
                      <button className="text-gray-400 hover:text-gray-600">
                        ⋯
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Gauge className="w-4 h-4 text-gray-400" />
                      <span className={getSpeedColor(vehicle.speed)}>
                        {vehicle.speed} km/h
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{vehicle.TrackDateTime.split(' ')[1]}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DoorOpen className="w-4 h-4 text-gray-400" />
                      <span className={vehicle.door === "Open" ? "text-red-600" : "text-green-600"}>
                        {vehicle.door}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Weight className="w-4 h-4 text-gray-400" />
                      <span>{vehicle.weight} kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 relative bg-gray-50">
        {/* Map Header */}
        <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Running: {vehicleCounts.running}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Idle: {vehicleCounts.idle}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Stopped: {vehicleCounts.stopped}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Offline: {vehicleCounts.offline}</span>
            </div>
          </div>
        </div>
        
        <Map
          ref={mapRef}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          onClick={onMapClick}
          mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
          style={mapStyle}
        >
          {dummyVehicles.map((vehicle) => (
            <Marker
              key={vehicle.vehicleId}
              longitude={vehicle.longitude}
              latitude={vehicle.latitude}
              anchor="bottom"
              onClick={(event) => onMarkerClick(event, vehicle)}
            >
              <div className={`relative group cursor-pointer ${
                selectedVehicle?.vehicleId === vehicle.vehicleId ? 'z-10' : 'z-0'
              }`}>
                {/* Pulse animation for running vehicles */}
                {getVehicleStatus(vehicle.ignition, vehicle.speed) === "Running" && (
                  <div className="absolute inset-0 w-12 h-12 bg-green-400 rounded-full animate-ping opacity-20"></div>
                )}
                
                {/* Main marker */}
                <div className={`relative w-10 h-10 rounded-full border-3 border-white shadow-xl flex items-center justify-center transform transition-all duration-200 hover:scale-110 ${
                  getStatusColor(vehicle.ignition, vehicle.speed) === "bg-green-500" 
                    ? 'bg-gradient-to-br from-green-500 to-green-600' 
                    : getStatusColor(vehicle.ignition, vehicle.speed) === "bg-yellow-500"
                    ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                    : getStatusColor(vehicle.ignition, vehicle.speed) === "bg-orange-500"
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                    : 'bg-gradient-to-br from-gray-500 to-gray-600'
                } ${selectedVehicle?.vehicleId === vehicle.vehicleId ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}`}>
                  <Truck className="w-5 h-5 text-white drop-shadow-sm" />
                </div>
                
                {/* Speed indicator */}
                {parseFloat(vehicle.speed) > 0 && (
                  <div className="absolute -top-2 -right-2 bg-white rounded-full px-2 py-1 shadow-md border border-gray-200">
                    <span className="text-xs font-bold text-gray-800">{vehicle.speed}</span>
                  </div>
                )}
                
                {/* Vehicle ID tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {vehicle.vehicleNo}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </Marker>
          ))}

          {selectedVehicle && (
            <Popup
              longitude={selectedVehicle.longitude}
              latitude={selectedVehicle.latitude}
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
              <div className="p-6 bg-white rounded-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      getStatusColor(selectedVehicle.ignition, selectedVehicle.speed)
                    }`}></div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{selectedVehicle.vehicleNo}</h3>
                      <p className="text-sm text-gray-500">ID: {selectedVehicle.vehicleId}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(selectedVehicle.ignition, selectedVehicle.speed)}`}
                  >
                    {getVehicleStatus(selectedVehicle.ignition, selectedVehicle.speed)}
                  </Badge>
                </div>
                
                {/* Vehicle Image Placeholder */}
                <div className="mb-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-2">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xs text-gray-600">Vehicle {selectedVehicle.vehicleNo}</p>
                </div>
                
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Speed</p>
                      <p className={`text-sm font-semibold ${getSpeedColor(selectedVehicle.speed)}`}>
                        {selectedVehicle.speed} km/h
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <Weight className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedVehicle.weight} kg</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <DoorOpen className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Door</p>
                      <p className={`text-sm font-semibold ${
                        selectedVehicle.door === "Open" ? "text-red-600" : "text-green-600"
                      }`}>
                        {selectedVehicle.door}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-xs text-gray-500">Expiry</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedVehicle.expiryDate}</p>
                    </div>
                  </div>
                </div>
                
                {/* Location */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Current Location</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedVehicle.location}</p>
                    </div>
                  </div>
                </div>
                
                {/* Last Update */}
                <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">Last Update: {selectedVehicle.TrackDateTime}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    View Details
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
