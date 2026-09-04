// NER Logistics AI - Strategic Corridor and Route Network
// Capturing elevation changes, modal switches, hazard risk indexes, and transit constraints

export const ROUTES = [
  {
    id: 'CORR-01',
    name: 'Guwahati – Tawang Strategic Defense & Supply Corridor',
    origin: {
      name: 'Guwahati Logistic Hub, Assam',
      state: 'Assam',
      lat: 26.1445,
      lng: 91.7362
    },
    destination: {
      name: 'Tawang Depot, Arunachal Pradesh',
      state: 'Arunachal Pradesh',
      lat: 27.5861,
      lng: 91.8594
    },
    distanceKm: 485,
    estimatedDuration: '14h 30m',
    modality: ['Highway 4x4', 'Mountain Ridge', 'High-Altitude Pass (13,700 ft)'],
    maxElevationMeters: 4170, // Sela Pass
    riskIndex: 72, // High risk due to snowpack and landslide propensity
    riskLevel: 'Warning',
    roadCondition: 'Single & Double Lane Bituminous, Winter Chains Required',
    activeAlertsCount: 3,
    fuelConsumptionEstLiters: 180,
    aiRecommendation: 'Recommend scheduling departure before 05:00 IST to clear Sela Pass prior to afternoon blizzard window.',
    waypoints: [
      { name: 'Guwahati Hub', lat: 26.1445, lng: 91.7362 },
      { name: 'Tezpur Bridge', lat: 26.6338, lng: 92.7926 },
      { name: 'Bhalukpong Gate', lat: 27.0135, lng: 92.6517 },
      { name: 'Bomdila Pass', lat: 27.2644, lng: 92.4239 },
      { name: 'Dirang Valley', lat: 27.3582, lng: 92.2384 },
      { name: 'Sela Pass (13,700 ft)', lat: 27.5054, lng: 92.1039 },
      { name: 'Tawang Depot', lat: 27.5861, lng: 91.8594 }
    ]
  },
  {
    id: 'CORR-02',
    name: 'Guwahati – Silchar Lifeline (NH-06 via Meghalaya Hills)',
    origin: {
      name: 'Guwahati Logistics Park, Assam',
      state: 'Assam',
      lat: 26.1445,
      lng: 91.7362
    },
    destination: {
      name: 'Silchar Supply Depot, Barak Valley',
      state: 'Assam',
      lat: 24.8333,
      lng: 92.7789
    },
    distanceKm: 310,
    estimatedDuration: '9h 15m',
    modality: ['Four-Lane Expressway', 'Hill Highway', 'Tunnel Section'],
    maxElevationMeters: 1490,
    riskIndex: 58,
    riskLevel: 'Warning',
    roadCondition: 'Heavy Monsoon Slumping near Sonapur Tunnel',
    activeAlertsCount: 2,
    fuelConsumptionEstLiters: 95,
    aiRecommendation: 'Sonapur mudflow warning active. AI advises monitor automated seismographic tilt sensors at km 142.',
    waypoints: [
      { name: 'Guwahati', lat: 26.1445, lng: 91.7362 },
      { name: 'Nongpoh', lat: 25.9015, lng: 91.8812 },
      { name: 'Shillong Bypass', lat: 25.6144, lng: 91.9547 },
      { name: 'Jowai Ridge', lat: 25.4542, lng: 92.2136 },
      { name: 'Sonapur Tunnel', lat: 25.1121, lng: 92.3615 },
      { name: 'Silchar Depot', lat: 24.8333, lng: 92.7789 }
    ]
  },
  {
    id: 'CORR-03',
    name: 'Brahmaputra NW-2 Green Inland Freight Waterway',
    origin: {
      name: 'Pandu Multi-Modal Inland Port, Guwahati',
      state: 'Assam',
      lat: 26.1754,
      lng: 91.6888
    },
    destination: {
      name: 'Dhubri River Port (Border Junction)',
      state: 'Assam',
      lat: 26.0207,
      lng: 89.9744
    },
    distanceKm: 218,
    estimatedDuration: '11h 00m',
    modality: ['Inland Waterway Barge', 'Ro-Pax Vessel'],
    maxElevationMeters: 55,
    riskIndex: 22,
    riskLevel: 'Optimal',
    roadCondition: 'Dredged Navigational Fairway (Min 2.5m Draft)',
    activeAlertsCount: 0,
    fuelConsumptionEstLiters: 65,
    aiRecommendation: 'High efficiency corridor. Generates 68% lower carbon emissions compared to road highway convoy.',
    waypoints: [
      { name: 'Pandu Port', lat: 26.1754, lng: 91.6888 },
      { name: 'Sualkuchi Ghat', lat: 26.1683, lng: 91.5642 },
      { name: 'Goalpara Anchorage', lat: 26.1738, lng: 90.6272 },
      { name: 'Dhubri River Port', lat: 26.0207, lng: 89.9744 }
    ]
  },
  {
    id: 'CORR-04',
    name: 'Dimapur – Kohima – Imphal Gateway (NH-29 / NH-02)',
    origin: {
      name: 'Dimapur Rail-Road Transshipment Center',
      state: 'Nagaland',
      lat: 25.9063,
      lng: 93.7275
    },
    destination: {
      name: 'Imphal Capital Distribution Center',
      state: 'Manipur',
      lat: 24.817,
      lng: 93.9368
    },
    distanceKm: 210,
    estimatedDuration: '7h 45m',
    modality: ['Hill Highway', 'All-Terrain 6x6'],
    maxElevationMeters: 1720,
    riskIndex: 65,
    riskLevel: 'Critical',
    roadCondition: 'Sinking Zone active between Kohima & Mao Gate',
    activeAlertsCount: 4,
    fuelConsumptionEstLiters: 82,
    aiRecommendation: 'Critical geological slippage at Phesama. Divert heavy axle convoys via alternative Maram-Peren bypass.',
    waypoints: [
      { name: 'Dimapur', lat: 25.9063, lng: 93.7275 },
      { name: 'Medziphema', lat: 25.7582, lng: 93.8561 },
      { name: 'Kohima Summit', lat: 25.6751, lng: 94.1086 },
      { name: 'Mao Border Gate', lat: 25.5123, lng: 94.1412 },
      { name: 'Senapati Depot', lat: 25.2654, lng: 94.0211 },
      { name: 'Kangpokpi', lat: 25.1487, lng: 93.9782 },
      { name: 'Imphal Center', lat: 24.817, lng: 93.9368 }
    ]
  },
  {
    id: 'CORR-05',
    name: 'Silchar – Aizawl Mountain Backbone (NH-54)',
    origin: {
      name: 'Silchar Logistics Depot',
      state: 'Assam',
      lat: 24.8333,
      lng: 92.7789
    },
    destination: {
      name: 'Aizawl North Hub, Mizoram',
      state: 'Mizoram',
      lat: 23.7271,
      lng: 92.7176
    },
    distanceKm: 175,
    estimatedDuration: '6h 30m',
    modality: ['Curved Mountain Highway', 'Reinforced 4x4'],
    maxElevationMeters: 1180,
    riskIndex: 44,
    riskLevel: 'Warning',
    roadCondition: 'Good surface with intermittent landslide clearance points',
    activeAlertsCount: 1,
    fuelConsumptionEstLiters: 58,
    aiRecommendation: 'Safe during daylight. Night travel restricted due to heavy mist and steep cliff precipices.',
    waypoints: [
      { name: 'Silchar', lat: 24.8333, lng: 92.7789 },
      { name: 'Vairengte Border Checkpoint', lat: 24.5082, lng: 92.7561 },
      { name: 'Kolasib Hill Depot', lat: 24.2238, lng: 92.6784 },
      { name: 'Aizawl North Hub', lat: 23.7271, lng: 92.7176 }
    ]
  },
  {
    id: 'CORR-06',
    name: 'Siliguri Corridor – Gangtok Supply Pipeline (NH-10)',
    origin: {
      name: 'Siliguri Strategic Transshipment Park, WB/NER',
      state: 'West Bengal / NER Border',
      lat: 26.7271,
      lng: 88.3953
    },
    destination: {
      name: 'Gangtok Central Goods Depot, Sikkim',
      state: 'Sikkim',
      lat: 27.3389,
      lng: 88.6065
    },
    distanceKm: 114,
    estimatedDuration: '4h 15m',
    modality: ['Teesta Gorge Highway', 'Bridge Crossings'],
    maxElevationMeters: 1650,
    riskIndex: 61,
    riskLevel: 'Warning',
    roadCondition: 'Vulnerable to Teesta River flash floods; multiple Bailey bridges operational',
    activeAlertsCount: 2,
    fuelConsumptionEstLiters: 48,
    aiRecommendation: 'Teesta water levels at Alert Stage 2. AI monitors Chungthang dam discharge telemetry.',
    waypoints: [
      { name: 'Siliguri', lat: 26.7271, lng: 88.3953 },
      { name: 'Sevoke Coronation Bridge', lat: 26.8834, lng: 88.4721 },
      { name: 'Teesta Bazaar', lat: 27.0583, lng: 88.4982 },
      { name: 'Rangpo Border Gate', lat: 27.1782, lng: 88.5293 },
      { name: 'Singtam Depot', lat: 27.2341, lng: 88.5012 },
      { name: 'Gangtok Depot', lat: 27.3389, lng: 88.6065 }
    ]
  }
];
