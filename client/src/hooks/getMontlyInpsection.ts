export default function getMonthlyInspectionStats(inspections: any[]) {
  const monthlyMap: Record<string, { total: number; completed: number; pending: number; fail: number }> = {};

  inspections.forEach((inspection) => {
    const date = new Date(inspection.createdAt);
    const month = date.toLocaleString("default", { month: "short" }); // Jan, Feb, etc.

    if (!monthlyMap[month]) {
      monthlyMap[month] = { total: 0, completed: 0, pending: 0, fail: 0 };
    }

    monthlyMap[month].total += 1;

    if (inspection.status === "completed") {
      monthlyMap[month].completed += 1;
    } else if (inspection.status === "pending") {
      monthlyMap[month].pending += 1;
    } else if (inspection.status === "fail") {
      monthlyMap[month].fail += 1;
    }
  });

  // Convert to array for recharts
  return Object.keys(monthlyMap).map((month) => ({
    month,
    ...monthlyMap[month],
  }));
}
