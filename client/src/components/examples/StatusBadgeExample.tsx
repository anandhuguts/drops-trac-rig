import { StatusBadge } from '../StatusBadge'

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <StatusBadge status="pass" />
      <StatusBadge status="fail" />
      <StatusBadge status="pending" />
      <StatusBadge status="in-progress" />
      <StatusBadge severity="low" variant="severity" />
      <StatusBadge severity="medium" variant="severity" />
      <StatusBadge severity="high" variant="severity" />
      <StatusBadge severity="critical" variant="severity" />
    </div>
  )
}