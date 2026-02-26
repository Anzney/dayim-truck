"use client";

interface VehicleHealth {
  vehicle: string;
  engine: number;
  brakes: number;
  tires: number;
  transmission: number;
}

const healthData: VehicleHealth[] = [
  { vehicle: "V-001", engine: 72, brakes: 73, tires: 91, transmission: 86 },
  { vehicle: "V-002", engine: 78, brakes: 72, tires: 76, transmission: 96 },
  { vehicle: "V-003", engine: 83, brakes: 98, tires: 85, transmission: 84 },
  { vehicle: "V-004", engine: 72, brakes: 79, tires: 69, transmission: 82 },
  { vehicle: "V-005", engine: 89, brakes: 77, tires: 65, transmission: 84 },
];

function HealthBar({ value }: { value: number }) {
  const getBarColor = (val: number) => {
    if (val > 80) return "bg-primary";
    if (val > 70) return "bg-amber-500";
    return "bg-destructive";
  };

  const getShadowColor = (val: number) => {
    if (val > 80) return "shadow-[0_0_8px_rgba(var(--primary),0.3)]";
    if (val > 70) return "shadow-[0_0_8px_rgba(245,158,11,0.3)]";
    return "shadow-[0_0_8px_rgba(var(--destructive),0.3)]";
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 bg-neutral-100 dark:bg-neutral-900 h-2 rounded-full overflow-hidden border border-border">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(value)} ${getShadowColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-bold text-muted-foreground min-w-[30px]">{value}%</span>
    </div>
  );
}

export function VehicleHealthSummary() {
  return (
    <div className="pt-4 border-t border-border">
      <h2 className="text-lg font-bold text-foreground mb-4">Vehicle Health Summary</h2>
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted-foreground text-[10px] uppercase tracking-wider border-b border-border">
              <th className="pb-3 font-semibold px-2">Vehicle</th>
              <th className="pb-3 font-semibold px-2">Engine</th>
              <th className="pb-3 font-semibold px-2">Brakes</th>
              <th className="pb-3 font-semibold px-2">Tires</th>
              <th className="pb-3 font-semibold px-2 text-right">Trans.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {healthData.map((item) => (
              <tr
                key={item.vehicle}
                className="group hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors duration-200 cursor-pointer"
              >
                <td className="py-3 px-2 text-foreground font-bold group-hover:text-primary transition-colors">
                  {item.vehicle}
                </td>
                <td className="py-3 px-2 min-w-[100px]">
                  <HealthBar value={item.engine} />
                </td>
                <td className="py-3 px-2 min-w-[100px]">
                  <HealthBar value={item.brakes} />
                </td>
                <td className="py-3 px-2 min-w-[100px]">
                  <HealthBar value={item.tires} />
                </td>
                <td className="py-3 px-2 min-w-[100px]">
                  <HealthBar value={item.transmission} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
