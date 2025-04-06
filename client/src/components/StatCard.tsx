import type { ReactNode } from "react"

interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
}

const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <div className="flex bg-white shadow-sm">
      <div className="w-16 h-16 bg-green-800 flex items-center justify-center text-white">{icon}</div>
      <div className="p-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-gray-600 uppercase">{label}</div>
      </div>
    </div>
  )
}

export default StatCard

