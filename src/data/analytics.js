// NER Logistics AI - Historical & Predictive Analytics Data

export const ANALYTICS = {
  summary: {
    totalActiveVehicles: 142,
    totalCargoTonsInTransit: 1485,
    onTimeDeliveryRate: 94.6, // %
    averageTransitDelayMins: 38,
    activeHazardAlerts: 5,
    fuelSavedLitersMonth: 48900,
    carbonOffsetTonsMonth: 128.5,
    remoteVillagesSuppliedCount: 312
  },

  monthlyThroughput: [
    { month: 'Apr', roadFreightTons: 12400, riverWaterwayTons: 6200, droneMedicKg: 850, alertsResolved: 18 },
    { month: 'May', roadFreightTons: 13100, riverWaterwayTons: 7100, droneMedicKg: 1100, alertsResolved: 24 },
    { month: 'Jun (Monsoon Start)', roadFreightTons: 9800, riverWaterwayTons: 11200, droneMedicKg: 1950, alertsResolved: 62 },
    { month: 'Jul (Peak Flood)', roadFreightTons: 8200, riverWaterwayTons: 13400, droneMedicKg: 2800, alertsResolved: 94 },
    { month: 'Aug (Floods)', roadFreightTons: 8900, riverWaterwayTons: 12800, droneMedicKg: 2650, alertsResolved: 78 },
    { month: 'Sep (Current)', roadFreightTons: 11500, riverWaterwayTons: 9400, droneMedicKg: 2100, alertsResolved: 45 }
  ],

  modalDistribution: [
    { name: 'All-Terrain Road Convoys', value: 58, color: '#F97316' },
    { name: 'Brahmaputra River Barges', value: 32, color: '#2563EB' },
    { name: 'Autonomous Medical Drones', value: 7, color: '#16A34A' },
    { name: 'Hill Railway Freight', value: 3, color: '#F59E0B' }
  ],

  hazardIncidentsByType: [
    { type: 'Monsoon Landslide / Mudflow', count: 42, severity: 'High', avgDelayHours: 6.8 },
    { type: 'River Flood & Sand Siltation', count: 28, severity: 'Medium', avgDelayHours: 4.2 },
    { type: 'High-Altitude Snow / Black Ice', count: 18, severity: 'High', avgDelayHours: 5.5 },
    { type: 'Bridge Load / Structural Repair', count: 9, severity: 'Low', avgDelayHours: 1.5 },
    { type: 'Dense Valley Fog / Heavy Rain', count: 15, severity: 'Low', avgDelayHours: 1.2 }
  ],

  stateAccessibilityRanking: [
    { state: 'Assam', avgRDAI: 82.4, coverage: '94%', convoysActive: 48 },
    { state: 'Tripura', avgRDAI: 79.1, coverage: '91%', convoysActive: 16 },
    { state: 'Meghalaya', avgRDAI: 76.8, coverage: '88%', convoysActive: 22 },
    { state: 'Sikkim', avgRDAI: 69.5, coverage: '82%', convoysActive: 14 },
    { state: 'Mizoram', avgRDAI: 64.2, coverage: '78%', convoysActive: 12 },
    { state: 'Nagaland', avgRDAI: 63.8, coverage: '75%', convoysActive: 15 },
    { state: 'Manipur', avgRDAI: 59.4, coverage: '72%', convoysActive: 10 },
    { state: 'Arunachal Pradesh', avgRDAI: 52.1, coverage: '64%', convoysActive: 18 }
  ]
};
