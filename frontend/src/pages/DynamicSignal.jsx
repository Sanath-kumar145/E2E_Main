import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"

export default function DynamicSignal() {

  const [lanes, setLanes] = useState([
    { id: "Lane 1", vehicles: 15, ambulance: false, signal: "green" },
    { id: "Lane 2", vehicles: 12, ambulance: false, signal: "red" },
    { id: "Lane 3", vehicles: 10, ambulance: false, signal: "red" },
    { id: "Lane 4", vehicles: 8, ambulance: false, signal: "red" }
  ])

  useEffect(() => {

    const interval = setInterval(() => {

      setLanes(prev => {

        let updated = prev.map(lane => {

          let vehicles = lane.vehicles

          // 🚦 vehicle movement
          if (lane.signal === "green") {
            vehicles = Math.max(0, vehicles - Math.floor(Math.random() * 5 + 3))
          } else {
            vehicles = vehicles + Math.floor(Math.random() * 4)
          }

          return { ...lane, vehicles }
        })

        // 🚑 randomly generate ambulance
        const ambulanceChance = Math.random()

        if (ambulanceChance < 0.05) {
          const randomLane = Math.floor(Math.random() * updated.length)

          updated = updated.map((lane, index) => ({
            ...lane,
            ambulance: index === randomLane
          }))
        }

        // 🚑 check ambulance lane
        const ambulanceLane = updated.find(l => l.ambulance)

        if (ambulanceLane) {

          // if ambulance lane empty → remove ambulance
          if (ambulanceLane.vehicles === 0) {
            updated = updated.map(l => ({
              ...l,
              ambulance: false
            }))
          } else {
            return updated.map(l => ({
              ...l,
              signal: l.ambulance ? "green" : "red"
            }))
          }
        }

        // 🚦 AI choose next lane
        const currentGreen = updated.find(l => l.signal === "green")

        if (!currentGreen || currentGreen.vehicles === 0) {

          const maxVehicles = Math.max(...updated.map(l => l.vehicles))

          updated = updated.map(l => ({
            ...l,
            signal: l.vehicles === maxVehicles && maxVehicles > 0 ? "green" : "red"
          }))
        }

        return updated

      })

    }, 4000)

    return () => clearInterval(interval)

  }, [])
  const ambulanceLane = lanes.find(l => l.ambulance)
  return (
    <div className="space-y-4">

      <PageHeader
        title="AI Traffic Optimization"
        subtitle="Dynamic signals with ambulance priority"
      />

      <Card>
        <CardHeader>
          <CardTitle>Traffic Lane Monitoring</CardTitle>
        </CardHeader>

        <CardContent>
        {ambulanceLane && (
            <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center font-semibold animate-pulse">
                🚑 Ambulance Detected in {ambulanceLane.id} — Giving GREEN Signal
            </div>
            )}
          {lanes.map(lane => (

                <div
                    key={lane.id}
                    className={`flex justify-between items-center border-b border-white/10 py-4 px-3 rounded-lg
                    ${lane.ambulance ? "bg-red-900/40 border border-red-500" : ""}`}
                >

              <div>
                <p className="font-semibold">{lane.id}</p>

                <p className="text-sm text-slate-400">
                  🚗 Vehicles: {lane.vehicles}
                </p>

                {lane.ambulance && (
                  <p className="text-red-400 text-sm">
                    🚑 Ambulance Passing
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">

                <div className="flex flex-col items-center gap-1">

                    <div className={`w-4 h-4 rounded-full
                    ${lane.signal === "red" ? "bg-red-500" : "bg-red-900"}`} />

                    <div className={`w-4 h-4 rounded-full
                    ${lane.signal === "green" ? "bg-green-500" : "bg-green-900"}`} />

                </div>

                <span className={`px-3 py-1 rounded text-sm font-semibold
                ${lane.signal === "green" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {lane.signal.toUpperCase()}
                </span>

                </div>

            </div>

          ))}

        </CardContent>
      </Card>

    </div>
  )
}