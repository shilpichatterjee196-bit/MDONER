// NER Logistics AI - Vehicle Telemetry Registry
// Covering all-terrain trucks, river barges, drones, and refrigerated medical rovers across 8 NER states

export const VEHICLES = [
  {
    id: 'NER-TRK-101',
    name: 'Brahmaputra Mammoth 6x6',
    type: 'Heavy All-Terrain Truck',
    category: 'Truck',
    plateNumber: 'AS-01-EA-4921',
    driver: {
      name: 'Bhaskar Jyoti Gogoi',
      phone: '+91 94350-12847',
      experience: '12 yrs NER Hill Roads',
      rating: 4.9
    },
    location: {
      state: 'Assam',
      hub: 'Guwahati Logistics Park',
      lat: 26.1445,
      lng: 91.7362,
      heading: 65,
      currentRoad: 'NH-27 East-West Corridor'
    },
    telemetry: {
      speed: 52, // km/h
      speedUnit: 'km/h',
      fuelLevel: 78, // %
      batteryHealth: 96, // %
      engineTemp: 86, // °C
      tirePressureAvg: 36, // PSI
      altitude: 165, // meters
      satelliteLocked: 11
    },
    cargo: {
      consignmentId: 'CNS-9021',
      description: 'Disaster Relief Dry Rations & Tarpaulins',
      weightKg: 8500,
      capacityKg: 12000,
      temperatureControl: false,
      destination: 'Nagaon Supply Depot'
    },
    status: 'In Transit', // In Transit | Available | Maintenance | Alert
    lastPing: '2 mins ago',
    eta: 'Today, 17:30 IST'
  },
  {
    id: 'NER-TRK-102',
    name: 'Kanchenjunga Hill Hauler 4x4',
    type: 'High-Altitude 4x4 Hauler',
    category: 'Truck',
    plateNumber: 'SK-02-B-1088',
    driver: {
      name: 'Tenzing Lepcha',
      phone: '+91 98320-44910',
      experience: '15 yrs Mountain Passes',
      rating: 4.95
    },
    location: {
      state: 'Sikkim',
      hub: 'Gangtok Border Depot',
      lat: 27.3389,
      lng: 88.6065,
      heading: 28,
      currentRoad: 'NH-310 Nathu La Route'
    },
    telemetry: {
      speed: 28,
      speedUnit: 'km/h',
      fuelLevel: 89,
      batteryHealth: 94,
      engineTemp: 82,
      tirePressureAvg: 34,
      altitude: 3120,
      satelliteLocked: 9
    },
    cargo: {
      consignmentId: 'CNS-8942',
      description: 'Border Post High-Altitude Heating Fuel',
      weightKg: 4200,
      capacityKg: 6000,
      temperatureControl: false,
      destination: 'Kupup Outpost'
    },
    status: 'In Transit',
    lastPing: 'Just now',
    eta: 'Today, 15:45 IST'
  },
  {
    id: 'NER-BRG-201',
    name: 'Luit Express Ro-Pax Cargo Barge',
    type: 'Inland Waterway Freight Vessel',
    category: 'Barge',
    plateNumber: 'IWAI-NW2-BG-14',
    driver: {
      name: 'Capt. Ranjit Saikia',
      phone: '+91 98640-77123',
      experience: '20 yrs NW-2 River Navigation',
      rating: 4.88
    },
    location: {
      state: 'Assam',
      hub: 'Pandu Multi-Modal Port, Guwahati',
      lat: 26.1754,
      lng: 91.6888,
      heading: 275,
      currentRoad: 'National Waterway 2 (Brahmaputra)'
    },
    telemetry: {
      speed: 13,
      speedUnit: 'knots',
      fuelLevel: 84,
      batteryHealth: 98,
      engineTemp: 76,
      tirePressureAvg: null,
      altitude: 54,
      satelliteLocked: 14
    },
    cargo: {
      consignmentId: 'CNS-7740',
      description: 'Bulk Agro-Fertilizers & Construction Steel',
      weightKg: 185000,
      capacityKg: 250000,
      temperatureControl: false,
      destination: 'Dhubri Inland River Port'
    },
    status: 'In Transit',
    lastPing: '1 min ago',
    eta: 'Tomorrow, 08:00 IST'
  },
  {
    id: 'NER-DRN-301',
    name: 'Garuda-X Heavy Lift VTOL Drone',
    type: 'Autonomous Heavy Cargo Drone',
    category: 'Drone',
    plateNumber: 'DGCA-UA-2609',
    driver: {
      name: 'Mission Controller Ananya Baruah',
      phone: '+91 99540-88219',
      experience: 'Autonomous Flight Operations',
      rating: 5.0
    },
    location: {
      state: 'Arunachal Pradesh',
      hub: 'Itanagar SkyLink Droneport',
      lat: 27.0844,
      lng: 93.6053,
      heading: 320,
      currentRoad: 'Corridor Alpha-3 (Airspace Flight Level 80)'
    },
    telemetry: {
      speed: 110,
      speedUnit: 'km/h',
      fuelLevel: 72, // Battery %
      batteryHealth: 99,
      engineTemp: 44,
      tirePressureAvg: null,
      altitude: 2150,
      satelliteLocked: 18
    },
    cargo: {
      consignmentId: 'CNS-MED-01',
      description: 'Emergency Anti-Venom & Blood Plasma Units',
      weightKg: 45,
      capacityKg: 80,
      temperatureControl: true,
      currentTemp: '3.8°C',
      destination: 'Seppa District Civil Hospital'
    },
    status: 'In Transit',
    lastPing: 'Just now',
    eta: 'Today, 12:15 IST'
  },
  {
    id: 'NER-MED-104',
    name: 'Barak LifeLine Cold-Chain Van',
    type: 'Refrigerated EV Medical Rover',
    category: 'Medical',
    plateNumber: 'AS-11-EV-3012',
    driver: {
      name: 'Dipankar Roy',
      phone: '+91 94351-99823',
      experience: '8 yrs Cold-Chain Transport',
      rating: 4.92
    },
    location: {
      state: 'Assam',
      hub: 'Silchar Medical Hub',
      lat: 24.8333,
      lng: 92.7789,
      heading: 140,
      currentRoad: 'NH-37 Silchar-Badarpur Route'
    },
    telemetry: {
      speed: 42,
      speedUnit: 'km/h',
      fuelLevel: 68, // EV SoC %
      batteryHealth: 95,
      engineTemp: 52,
      tirePressureAvg: 33,
      altitude: 40,
      satelliteLocked: 12
    },
    cargo: {
      consignmentId: 'CNS-MED-09',
      description: 'Measles-Rubella & Pentavalent Vaccines',
      weightKg: 420,
      capacityKg: 1500,
      temperatureControl: true,
      currentTemp: '4.2°C',
      destination: 'Karimganj Rural Health Outpost'
    },
    status: 'In Transit',
    lastPing: '3 mins ago',
    eta: 'Today, 14:00 IST'
  },
  {
    id: 'NER-TRK-105',
    name: 'Naga Warrior 6x6 Heavy Logistics',
    type: 'Heavy All-Terrain Truck',
    category: 'Truck',
    plateNumber: 'NL-07-C-5582',
    driver: {
      name: 'Keviletuo Angami',
      phone: '+91 98620-11782',
      experience: '14 yrs NH-29 Mountain Passes',
      rating: 4.87
    },
    location: {
      state: 'Nagaland',
      hub: 'Dimapur Dry Port Cargo Complex',
      lat: 25.9063,
      lng: 93.7275,
      heading: 110,
      currentRoad: 'NH-29 Dimapur-Kohima Highway'
    },
    telemetry: {
      speed: 0,
      speedUnit: 'km/h',
      fuelLevel: 94,
      batteryHealth: 92,
      engineTemp: 40,
      tirePressureAvg: 35,
      altitude: 260,
      satelliteLocked: 10
    },
    cargo: {
      consignmentId: 'CNS-6610',
      description: 'Grain Sacks, Cooking Oil & Salt Supplies',
      weightKg: 10200,
      capacityKg: 12000,
      temperatureControl: false,
      destination: 'Kohima Central Warehouse'
    },
    status: 'Available',
    lastPing: '12 mins ago',
    eta: 'Scheduled: 16:00 IST departure'
  },
  {
    id: 'NER-TRK-106',
    name: 'Mizo Hills 4x4 Extreme Express',
    type: 'Reinforced 4x4 Hill Hauler',
    category: 'Truck',
    plateNumber: 'MZ-01-D-9931',
    driver: {
      name: 'Lalremruata Sailo',
      phone: '+91 94361-55021',
      experience: '11 yrs Hill Terrain',
      rating: 4.9
    },
    location: {
      state: 'Mizoram',
      hub: 'Aizawl Logistics Distribution Node',
      lat: 23.7271,
      lng: 92.7176,
      heading: 195,
      currentRoad: 'NH-54 Aizawl-Lunglei Ridge Route'
    },
    telemetry: {
      speed: 36,
      speedUnit: 'km/h',
      fuelLevel: 61,
      batteryHealth: 91,
      engineTemp: 88,
      tirePressureAvg: 34,
      altitude: 1132,
      satelliteLocked: 11
    },
    cargo: {
      consignmentId: 'CNS-5501',
      description: 'LPG Domestic Cylinders & Solar Inverters',
      weightKg: 5800,
      capacityKg: 7500,
      temperatureControl: false,
      destination: 'Lunglei Sub-Divisional Depot'
    },
    status: 'In Transit',
    lastPing: 'Just now',
    eta: 'Today, 19:15 IST'
  },
  {
    id: 'NER-TRK-107',
    name: 'Manipur Highway Defender 6x6',
    type: 'Heavy All-Terrain Truck',
    category: 'Truck',
    plateNumber: 'MN-01-A-4109',
    driver: {
      name: 'Thoiba Singh',
      phone: '+91 97740-33291',
      experience: '16 yrs NH-37 & NH-02',
      rating: 4.84
    },
    location: {
      state: 'Manipur',
      hub: 'Imphal West Supply Depot',
      lat: 24.817,
      lng: 93.9368,
      heading: 315,
      currentRoad: 'NH-37 Imphal-Jiribam Highway'
    },
    telemetry: {
      speed: 44,
      speedUnit: 'km/h',
      fuelLevel: 55,
      batteryHealth: 89,
      engineTemp: 85,
      tirePressureAvg: 35,
      altitude: 786,
      satelliteLocked: 13
    },
    cargo: {
      consignmentId: 'CNS-4402',
      description: 'Pharmaceuticals & Water Purification Tablets',
      weightKg: 7100,
      capacityKg: 10000,
      temperatureControl: false,
      destination: 'Noney Community Health Center'
    },
    status: 'Alert', // Road Hazard Warning
    lastPing: '4 mins ago',
    eta: 'Delayed by +45m due to mud debris'
  }
];
