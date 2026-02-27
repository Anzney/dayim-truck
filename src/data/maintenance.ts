export interface ScheduleItem {
    id: string;
    vehicle: string;
    service: string;
    date: string;
    cost: number;
    status: "Scheduled" | "Overdue" | "Completed";
}

export const scheduleData: ScheduleItem[] = [
    { id: "M-001", vehicle: "V-003", service: "Oil Change", date: "2026-02-20", cost: 450, status: "Scheduled" },
    { id: "M-002", vehicle: "V-001", service: "Tire Rotation", date: "2026-02-25", cost: 200, status: "Scheduled" },
    { id: "M-003", vehicle: "V-005", service: "Brake Inspection", date: "2026-03-01", cost: 350, status: "Scheduled" },
    { id: "M-004", vehicle: "V-008", service: "Engine Diagnostic", date: "2026-02-18", cost: 600, status: "Overdue" },
    { id: "M-005", vehicle: "V-002", service: "Transmission Service", date: "2026-02-15", cost: 1200, status: "Completed" },
    { id: "M-006", vehicle: "V-007", service: "AC Repair", date: "2026-02-10", cost: 800, status: "Completed" },
];

export interface FaultCode {
    code: string;
    description: string;
    vehicle: string;
    date: string;
}

export const faultCodes: FaultCode[] = [
    {
        code: "P0300",
        description: "Random/Multiple Cylinder Misfire",
        vehicle: "V-008",
        date: "2026-02-17",
    },
    {
        code: "P0171",
        description: "System Too Lean (Bank 1)",
        vehicle: "V-003",
        date: "2026-02-16",
    },
    {
        code: "P0420",
        description: "Catalyst System Efficiency Below Threshold",
        vehicle: "V-005",
        date: "2026-02-14",
    },
];

export interface VehicleHealth {
    vehicle: string;
    engine: number;
    brakes: number;
    tires: number;
    transmission: number;
}

export const healthData: VehicleHealth[] = [
    { vehicle: "V-001", engine: 72, brakes: 73, tires: 91, transmission: 86 },
    { vehicle: "V-002", engine: 78, brakes: 72, tires: 76, transmission: 96 },
    { vehicle: "V-003", engine: 83, brakes: 98, tires: 85, transmission: 84 },
    { vehicle: "V-004", engine: 72, brakes: 79, tires: 69, transmission: 82 },
    { vehicle: "V-005", engine: 89, brakes: 77, tires: 65, transmission: 84 },
];
