// NER Logistics AI - Detailed Incident Logs & Disaster Triage Data

export const INCIDENTS = [
  {
    id: 'INC-2026-881',
    alertId: 'ALT-1092',
    title: 'Mudslide Breach at Chumukedima Hill Section',
    state: 'Nagaland',
    district: 'Dimapur / Kohima Ridge',
    reportedBy: 'Convoy Commander Capt. R. Sema',
    time: '2026-09-04 10:45 IST',
    status: 'In Progress', // Open | In Progress | Resolved | Closed
    priority: 'Critical',
    assignedTeam: 'BRO Project Sewak - Quick Response Unit 3',
    resourcesDeployed: [
      { item: 'Caterpillar 320D Hydraulic Excavator', qty: 2 },
      { item: 'Front End Wheel Loader', qty: 1 },
      { item: 'Tipper Dumper Trucks', qty: 4 },
      { item: 'Disaster Triage Personnel', qty: 18 }
    ],
    strandedVehiclesCount: 22,
    casualties: 0,
    progressPercentage: 45,
    updates: [
      { time: '11:20 IST', note: 'First excavator reached location, clearing outer mud barrier.' },
      { time: '11:00 IST', note: 'State Police blocked both inbound and outbound approaches to prevent pile-up.' },
      { time: '10:45 IST', note: 'Emergency telemetry SOS received from NER-TRK-107.' }
    ]
  },
  {
    id: 'INC-2026-882',
    alertId: 'ALT-1091',
    title: 'River Swell Influx near Majuli Ghats',
    state: 'Assam',
    district: 'Majuli / Jorhat',
    reportedBy: 'IWAI Vessel Traffic Master',
    time: '2026-09-04 09:30 IST',
    status: 'In Progress',
    priority: 'High',
    assignedTeam: 'SDRF River Rescue & IWAI Patrol Wing',
    resourcesDeployed: [
      { item: 'Twin-Engine Rescue Patrol Craft', qty: 2 },
      { item: 'Echo Sounder Dredging Survey Boat', qty: 1 },
      { item: 'Emergency Life Support Team', qty: 8 }
    ],
    strandedVehiclesCount: 6,
    casualties: 0,
    progressPercentage: 70,
    updates: [
      { time: '10:15 IST', note: 'Ro-Pax ferry docked safely at Kamalabari Ghat.' },
      { time: '09:30 IST', note: 'Severe river swell detected on navigational sensors.' }
    ]
  },
  {
    id: 'INC-2026-883',
    alertId: 'ALT-1090',
    title: 'Sela Pass Black Ice Surface Glaze',
    state: 'Arunachal Pradesh',
    district: 'West Kameng / Tawang',
    reportedBy: 'BRO Snow Clearance Post',
    time: '2026-09-04 08:15 IST',
    status: 'In Progress',
    priority: 'Medium',
    assignedTeam: 'Project Vartak High-Altitude Engineering Group',
    resourcesDeployed: [
      { item: 'Rotary Snow Blower Truck', qty: 2 },
      { item: 'Salt & Sand Gritting Spreader', qty: 2 }
    ],
    strandedVehiclesCount: 9,
    casualties: 0,
    progressPercentage: 80,
    updates: [
      { time: '10:00 IST', note: 'Salt gritting completed on north slope hairpins.' },
      { time: '08:15 IST', note: 'Temperature reached -9°C; tire chain mandate triggered.' }
    ]
  },
  {
    id: 'INC-2026-884',
    alertId: 'ALT-1089',
    title: 'Lubha Bailey Bridge Structural Check',
    state: 'Meghalaya',
    district: 'East Jaintia Hills',
    reportedBy: 'NHAI Regional Field Engineer',
    time: '2026-09-04 06:00 IST',
    status: 'Resolved',
    priority: 'Low',
    assignedTeam: 'NHAI Bridge Inspection Unit',
    resourcesDeployed: [
      { item: 'Ultrasonic Flaw Detector', qty: 1 },
      { item: 'Hydraulic Torque Tensioners', qty: 4 }
    ],
    strandedVehiclesCount: 0,
    casualties: 0,
    progressPercentage: 100,
    updates: [
      { time: '09:00 IST', note: 'Inspection completed, 24T load limit posted with traffic police oversight.' },
      { time: '06:00 IST', note: 'Routine scheduled maintenance initiated.' }
    ]
  }
];
