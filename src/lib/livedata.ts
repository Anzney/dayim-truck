// Live Data API Configuration and Structure

import { Vehicle } from "@/types/vehicle";

// API Configuration - Updated to use local proxy
const LIVE_DATA_CONFIG = {
  baseUrl: "/api/vehicles", // Local proxy endpoint
  params: {} // No params needed for proxy
};

// API URL builder - Simplified for proxy
const buildLiveDataUrl = (): string => {
  return LIVE_DATA_CONFIG.baseUrl;
};

// Vehicle data structure based on API response
const vehicleDataStructure: Vehicle = {
  vehicleId: "",           // Vehicle ID (e.g., "32754")
  vehicleNo: "",           // Vehicle number (e.g., "8950-BGB")
  latitude: "",            // Latitude coordinate (e.g., "27.0203466000")
  longitude: "",           // Longitude coordinate (e.g., "49.6414216000")
  TrackDateTime: "",       // Tracking date and time (e.g., "2025-08-26 16:46:46")
  speed: "",               // Current speed (e.g., "0.00")
  ignition: "",            // Ignition status (e.g., "0" for off, "1" for on)
  door: "Closed",          // Door status (e.g., "Closed", "Open")
  weight: ""               // Vehicle weight (e.g., "1700.00")
};

// API functions
const liveDataAPI = {
  // Fetch live vehicle data from proxy
  async fetchLiveData(): Promise<any> {
    try {
      const url = buildLiveDataUrl();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control to ensure fresh data
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the proxy returned an error
      if (data.error) {
        throw new Error(data.message || data.error);
      }

      return data;
    } catch (error) {
      console.error('Error fetching live data:', error);
      throw error;
    }
  },

  // Parse vehicle data from API response
  parseVehicleData(apiResponse: any): Vehicle[] | Vehicle {
    // The API returns { data: [...], message: "...", status: "..." }
    // We need to extract the data array
    if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
      return apiResponse.data.map((vehicle: any) => ({
        ...vehicleDataStructure,
        ...vehicle
      }));
    } else if (Array.isArray(apiResponse)) {
      // Fallback: if response is directly an array
      return apiResponse.map((vehicle: any) => ({
        ...vehicleDataStructure,
        ...vehicle
      }));
    } else if (typeof apiResponse === 'object' && apiResponse !== null) {
      // Fallback: if response is a single vehicle object
      return {
        ...vehicleDataStructure,
        ...apiResponse
      };
    }

    throw new Error('Invalid API response format');
  },

  // Get formatted vehicle data
  async getFormattedLiveData(): Promise<Vehicle[] | Vehicle> {
    try {
      const rawData = await this.fetchLiveData();
      return this.parseVehicleData(rawData);
    } catch (error) {
      console.error('Error getting formatted live data:', error);
      throw error;
    }
  }
};

// Export the API structure
export default liveDataAPI;
export { LIVE_DATA_CONFIG, vehicleDataStructure, buildLiveDataUrl };
