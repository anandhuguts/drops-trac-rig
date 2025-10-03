export default function getRigPerformance(rigs: any[], inspections: any[]) {
  // create map with all rigs initialized
  const rigMap: Record<string, { inspections: number; issues: number; compliance: number; completed: number }> = {};

  rigs.forEach((rig) => {
    rigMap[rig.name] = { inspections: 0, issues: 0, compliance: 0, completed: 0 };
  });

  // count inspections by rig
  inspections.forEach((inspection) => {
    const rigName = inspection.rig; // assuming inspection.rig is the rig name
    if (!rigMap[rigName]) {
      rigMap[rigName] = { inspections: 0, issues: 0, compliance: 0, completed: 0 };
    }

    rigMap[rigName].inspections += 1;

    if (inspection.status === "fail") {
      rigMap[rigName].issues += 1;
    }

    if (inspection.status === "completed") {
      rigMap[rigName].completed += 1;
    }
  });

  // compute compliance %
  Object.keys(rigMap).forEach((rig) => {
    const { inspections, completed } = rigMap[rig];
    rigMap[rig].compliance = inspections > 0 ? Math.round((completed / inspections) * 100) : 0;
  });

  // return as array for charts/UI
  return Object.keys(rigMap).map((rig) => ({
    rig,
    inspections: rigMap[rig].inspections,
    issues: rigMap[rig].issues,
    compliance: rigMap[rig].compliance,
  }));
}
