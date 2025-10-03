import { useState, useEffect } from "react";

export const useFilteredInspections = (
  inspections: any[],
  selectedRig: string,
  selectedInspector: string,
  selectedPeriod: string,
  startDate?: string,
  endDate?: string,
  selectedStatus?: string,
  selectedSeverity?: string
) => {
  const [filteredInspections, setFilteredInspections] = useState(inspections);

  useEffect(() => {
    let filtered = [...inspections]; // Create a copy to avoid mutations

    console.log('🔍 Starting filter with:', {
      totalInspections: inspections.length,
      selectedRig,
      selectedInspector,
      selectedPeriod,
      startDate,
      endDate
    });

    // Inspector filter
    if (selectedInspector && selectedInspector !== "all") {
      filtered = filtered.filter((i) =>
        i.inspectors?.includes(selectedInspector)
      );
      console.log(`After inspector filter (${selectedInspector}):`, filtered.length);
    }

    // Rig filter
    if (selectedRig && selectedRig !== "all") {
      filtered = filtered.filter((i) => i.rig === selectedRig);
      console.log(`After rig filter (${selectedRig}):`, filtered.length);
    }

    // Status filter (optional)
    if (selectedStatus && selectedStatus !== "all") {
      filtered = filtered.filter((i) => i.status === selectedStatus);
      console.log(`After status filter (${selectedStatus}):`, filtered.length);
    }

    // Severity filter (optional)
    if (selectedSeverity && selectedSeverity !== "all") {
      filtered = filtered.filter(
        (i) => i.priority?.toLowerCase() === selectedSeverity.toLowerCase()
      );
      console.log(`After severity filter (${selectedSeverity}):`, filtered.length);
    }

    // Time period filter (only if no custom date range is provided)
    if (selectedPeriod && selectedPeriod !== "all" && !startDate && !endDate) {
      const now = new Date();
      let fromDate: Date;

      switch (selectedPeriod) {
        case "last-7-days":
          fromDate = new Date(now);
          fromDate.setDate(now.getDate() - 7);
          break;
        case "last-30-days":
          fromDate = new Date(now);
          fromDate.setDate(now.getDate() - 30);
          break;
        case "last-90-days":
          fromDate = new Date(now);
          fromDate.setDate(now.getDate() - 90);
          break;
        case "last-year":
          fromDate = new Date(now);
          fromDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          fromDate = new Date(0);
      }

      console.log(`📅 Period filter (${selectedPeriod}):`, {
        fromDate: fromDate.toISOString(),
        now: now.toISOString()
      });

      // Filter the inspections based on the period
      const beforeFilter = filtered.length;
      filtered = filtered.filter((i) => {
        const inspectionDate = new Date(i.createdAt);
        const isInRange = inspectionDate >= fromDate && inspectionDate <= now;
        if (!isInRange) {
          console.log(`  ❌ Excluding:`, i.title, inspectionDate.toISOString());
        }
        return isInRange;
      });
      console.log(`After period filter: ${filtered.length} (was ${beforeFilter})`);
    }

    // Custom date range filter (overrides selectedPeriod if provided)
    if (startDate && endDate) {
      const from = new Date(startDate);
      const to = new Date(endDate);
      to.setHours(23, 59, 59, 999); // include the full day

      console.log(`📅 Custom date range:`, {
        from: from.toISOString(),
        to: to.toISOString()
      });

      filtered = filtered.filter((i) => {
        const inspectionDate = new Date(i.createdAt);
        return inspectionDate >= from && inspectionDate <= to;
      });
      console.log(`After custom date filter:`, filtered.length);
    }

    console.log('✅ Final filtered count:', filtered.length);
    setFilteredInspections(filtered);
  }, [
    inspections,
    selectedRig,
    selectedInspector,
    selectedPeriod,
    startDate,
    endDate,
    selectedStatus,
    selectedSeverity,
  ]);

  return filteredInspections;
};