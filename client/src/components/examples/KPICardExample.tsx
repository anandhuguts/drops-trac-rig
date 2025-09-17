import { KPICard } from '../KPICard'
import { CheckCircle } from 'lucide-react'

export default function KPICardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 p-4">
      <KPICard
        title="Total Inspections"
        value="1,247"
        change={{ value: 12, type: "increase" }}
        icon={CheckCircle}
        description="This month"
      />
      <KPICard
        title="Pass Rate"
        value="78%"
        change={{ value: 3, type: "decrease" }}
        icon={CheckCircle}
        description="Overall compliance"
      />
    </div>
  )
}