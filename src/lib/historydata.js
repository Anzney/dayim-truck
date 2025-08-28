// Historical Data API Configuration and Structure

// API Configuration - Updated to use local proxy
const HISTORY_DATA_CONFIG = {
  baseUrl: "/api/history", // Local proxy endpoint
  params: {} // No params needed for proxy
};

// API URL builder - Simplified for proxy
const buildHistoryDataUrl = () => {
  return HISTORY_DATA_CONFIG.baseUrl;
};

// Authentication structure
const authStructure = {
  username: "dc.Tracking",
  password: "Track@dc1000"
};

// Request data structure
const requestDataStructure = {
  vehicleNo: "",           // Vehicle number (e.g., "8074-BGB")
  fromDate: "",            // Start date and time (e.g., "2025-08-10 00:00:00")
  toDate: "",              // End date and time (e.g., "2025-08-16 11:30:00")
  intervel: "All",         // Data interval (e.g., "All", "5min", "10min", etc.)
  filter: "All Data"       // Data filter (e.g., "All Data", "Moving", "Stopped", etc.)
};

// Complete request body structure
const requestBodyStructure = {
  auth: authStructure,
  data: requestDataStructure
};

// Historical data response structure (based on typical tracking API responses)
const historicalDataStructure = {
  vehicleId: "",           // Vehicle ID
  vehicleNo: "",           // Vehicle number
  latitude: "",            // Latitude coordinate
  longitude: "",           // Longitude coordinate
  TrackDateTime: "",       // Tracking date and time
  location: "",            // Human-readable location
  speed: "",               // Speed at that time
  ignition: "",            // Ignition status
  distance: "",            // Distance traveled
  door: "",                // Door status
  seatbelt: "",            // Seatbelt status
  isCanbus: "",            // CAN bus status
  weight: "",              // Vehicle weight
  fuelLevel: "",           // Fuel level (if available)
  engineRPM: "",           // Engine RPM (if available)
  temperature: "",         // Temperature (if available)
  altitude: ""             // Altitude (if available)
};

// API functions
const historyDataAPI = {
  // Fetch historical vehicle data from proxy
  async fetchHistoryData(requestData) {
    try {
      const url = buildHistoryDataUrl();
      
      // Prepare request body
      const requestBody = {
        ...requestDataStructure,
        ...requestData
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
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
      console.error('Error fetching historical data:', error);
      throw error;
    }
  },

  // Parse historical data from API response
  parseHistoricalData(apiResponse) {
    // Handle different response formats
    if (apiResponse.success === "F0") {
      throw new Error(`API Error: ${apiResponse.message || 'Unknown error'}`);
    }
    
    if (apiResponse.data && Array.isArray(apiResponse.data)) {
      return apiResponse.data.map(record => ({
        ...historicalDataStructure,
        ...record
      }));
    } else if (Array.isArray(apiResponse)) {
      return apiResponse.map(record => ({
        ...historicalDataStructure,
        ...record
      }));
    } else if (typeof apiResponse === 'object' && apiResponse !== null) {
      return {
        ...historicalDataStructure,
        ...apiResponse
      };
    }
    
    throw new Error('Invalid API response format');
  },

  // Get formatted historical data
  async getFormattedHistoryData(requestData) {
    try {
      const rawData = await this.fetchHistoryData(requestData);
      return this.parseHistoricalData(rawData);
    } catch (error) {
      console.error('Error getting formatted historical data:', error);
      throw error;
    }
  },

  // Helper function to create date range for last N days
  createDateRangeForLastDays(days, vehicleNo) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return {
      vehicleNo: vehicleNo,
      fromDate: startDate.toISOString().slice(0, 19).replace('T', ' '),
      toDate: endDate.toISOString().slice(0, 19).replace('T', ' '),
      intervel: "All",
      filter: "All Data"
    };
  },

  // Helper function to create date range for specific dates
  createDateRange(fromDate, toDate, vehicleNo) {
    return {
      vehicleNo: vehicleNo,
      fromDate: fromDate,
      toDate: toDate,
      intervel: "All",
      filter: "All Data"
    };
  }
};

// Export the API structure
export default historyDataAPI;
export { 
  HISTORY_DATA_CONFIG, 
  authStructure, 
  requestDataStructure, 
  requestBodyStructure,
  historicalDataStructure, 
  buildHistoryDataUrl 
};
