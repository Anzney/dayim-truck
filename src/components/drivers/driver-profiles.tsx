import React from 'react'

const drivers = [
  { id: 'D-001', name: 'John Miller', score: 92, trips: 234, hours: '1850h', violations: 1, vehicle: 'V-001', status: 'Good' },
  { id: 'D-002', name: 'Sarah Chen', score: 97, trips: 189, hours: '1620h', violations: 0, vehicle: 'V-002', status: 'Excellent' },
  { id: 'D-003', name: 'Mike Johnson', score: 85, trips: 156, hours: '1340h', violations: 3, vehicle: 'V-004', status: 'Warning' },
  { id: 'D-004', name: 'Lisa Park', score: 94, trips: 201, hours: '1710h', violations: 0, vehicle: 'V-006', status: 'Good' },
  { id: 'D-005', name: 'David Brown', score: 78, trips: 267, hours: '2100h', violations: 5, vehicle: 'V-007', status: 'Critical' },
  { id: 'D-006', name: 'Tom Wilson', score: 88, trips: 145, hours: '1180h', violations: 2, vehicle: 'V-008', status: 'Average' },
]

const DriverProfiles = () => {
  return (
    <div className="rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl p-6 flex-1 shadow-xl">
      <h2 className="text-xl font-bold text-foreground mb-6">Driver Profiles</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted-foreground text-sm border-b pb-4">
              <th className="pb-4 font-medium">ID</th>
              <th className="pb-4 font-medium">Name</th>
              <th className="pb-4 font-medium">Score</th>
              <th className="pb-4 font-medium">Trips</th>
              <th className="pb-4 font-medium">Hours</th>
              <th className="pb-4 font-medium">Violations</th>
              <th className="pb-4 font-medium">Vehicle</th>
              <th className="pb-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {drivers.map((driver) => (
              <tr key={driver.id} className="text-sm hover:bg-white/5 transition-colors group">
                <td className="py-4 text-cyan-400 font-medium">{driver.id}</td>
                <td className="py-4 text-foreground">{driver.name}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${driver.score >= 90 ? 'bg-green-500' :
                          driver.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${driver.score}%` }}
                      ></div>
                    </div>
                    <span className="text-foreground font-bold">{driver.score}</span>
                  </div>
                </td>
                <td className="py-4 text-foreground">{driver.trips}</td>
                <td className="py-4 text-foreground">{driver.hours}</td>
                <td className="py-4">
                  {driver.violations === 0 ? (
                    <span className="text-green-400">Clean</span>
                  ) : (
                    <span className="text-red-400">⚠ {driver.violations}</span>
                  )}
                </td>
                <td className="py-4 text-foreground">{driver.vehicle}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-cyan-400 hover:underline cursor-pointer">View</button>
                    <button className="text-muted-foreground hover:text-foreground cursor-pointer">Assign</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DriverProfiles
