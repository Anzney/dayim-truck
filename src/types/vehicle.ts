
export interface Vehicle {
  vehicleId: string;
  vehicleNo?: string;
  latitude: string;
  longitude: string;
  speed: string;
  ignition: string;
  TrackDateTime: string;
  weight?: string;
  door?: string;
}

export type VehicleStatus = 'Running' | 'Idle' | 'Stopped' | 'Offline';
