// Live Data API Configuration and Structure

// API Configuration - Updated to use local proxy
const LIVE_DATA_CONFIG = {
  baseUrl: "/api/vehicles", // Local proxy endpoint
  params: {} // No params needed for proxy
};

// API URL builder - Simplified for proxy
const buildLiveDataUrl = () => {
  return LIVE_DATA_CONFIG.baseUrl;
};

// Vehicle data structure based on API response
const vehicleDataStructure = {
  vehicleId: "",           // Vehicle ID (e.g., "32754")
  vehicleNo: "",           // Vehicle number (e.g., "8950-BGB")
  latitude: "",            // Latitude coordinate (e.g., "27.0203466000")
  longitude: "",           // Longitude coordinate (e.g., "49.6414216000")
  TrackDateTime: "",       // Tracking date and time (e.g., "2025-08-26 16:46:46")
  location: "",            // Human-readable location (e.g., "Al Jubayl, Al Jubayl Governorate, Eastern Region, 35514, Saudi Arabia")
  speed: "",               // Current speed (e.g., "0.00")
  ignition: "",            // Ignition status (e.g., "0" for off, "1" for on)
  distance: "",            // Total distance traveled (e.g., "129465.43")
  expiryDate: "",          // Vehicle expiry date (e.g., "2030-03-16")
  door: "",                // Door status (e.g., "Closed", "Open")
  seatbelt: "",            // Seatbelt status (e.g., "NA", "On", "Off")
  isCanbus: "",            // CAN bus status (e.g., "0", "1")
  weight: ""               // Vehicle weight (e.g., "1700.00")
};

// API functions
const liveDataAPI = {
  // Fetch live vehicle data from proxy
  async fetchLiveData() {
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
  parseVehicleData(apiResponse) {
    // The API returns { data: [...], message: "...", status: "..." }
    // We need to extract the data array
    if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
      return apiResponse.data.map(vehicle => ({
        ...vehicleDataStructure,
        ...vehicle
      }));
    } else if (Array.isArray(apiResponse)) {
      // Fallback: if response is directly an array
      return apiResponse.map(vehicle => ({
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
  async getFormattedLiveData() {
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
