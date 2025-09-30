import { useState, useEffect } from "react";

export const useFilteredInspections = (
  inspections: any[],
  selectedRig: string,
  selectedInspector: string
) => {
  const [filteredInspections, setFilteredInspections] = useState(inspections);

  useEffect(() => {
    let filtered = inspections;

    if (selectedInspector && selectedInspector !== "all") {
      filtered = filtered.filter((i) =>
        i.inspectors.includes(selectedInspector)
      );
    }

    if (selectedRig && selectedRig !== "all") {
      filtered = filtered.filter((i) => i.rig === selectedRig);
    }

    setFilteredInspections(filtered);
  }, [inspections, selectedRig, selectedInspector]);

  return filteredInspections;
};
