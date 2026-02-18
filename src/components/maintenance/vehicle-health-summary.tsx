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
    if (val > 80) return "bg-[#52c41a]";
    if (val > 70) return "bg-[#faad14]";
    return "bg-[#ff4d4f]";
  };

  const getShadowColor = (val: number) => {
    if (val > 80) return "shadow-[0_0_8px_rgba(82,196,26,0.3)]";
    if (val > 70) return "shadow-[0_0_8px_rgba(250,173,20,0.3)]";
    return "shadow-[0_0_8px_rgba(255,77,79,0.3)]";
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 bg-[#1e2235] h-2 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(value)} ${getShadowColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-bold text-[#94a3b8] min-w-[30px]">{value}%</span>
    </div>
  );
}

export function VehicleHealthSummary() {
  return (
    <div className="pt-4 border-t border-[#1e2235]/30">
      <h2 className="text-xl font-bold text-white mb-6">Vehicle Health Summary</h2>
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#1e2235] scrollbar-track-transparent">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#94a3b8] text-xs uppercase tracking-wider border-b border-[#1e2235]/50">
              <th className="pb-4 font-semibold px-2">Vehicle</th>
              <th className="pb-4 font-semibold px-2">Engine</th>
              <th className="pb-4 font-semibold px-2">Brakes</th>
              <th className="pb-4 font-semibold px-2">Tires</th>
              <th className="pb-4 font-semibold px-2 text-right">Trans.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e2235]/30">
            {healthData.map((item) => (
              <tr
                key={item.vehicle}
                className="group hover:bg-[#161b22] transition-colors duration-200 cursor-pointer"
              >
                <td className="py-4 px-2 text-white font-bold group-hover:text-[#00d1ff] transition-colors">
                  {item.vehicle}
                </td>
                <td className="py-4 px-2 min-w-[120px]">
                  <HealthBar value={item.engine} />
                </td>
                <td className="py-4 px-2 min-w-[120px]">
                  <HealthBar value={item.brakes} />
                </td>
                <td className="py-4 px-2 min-w-[120px]">
                  <HealthBar value={item.tires} />
                </td>
                <td className="py-4 px-2 min-w-[120px]">
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
