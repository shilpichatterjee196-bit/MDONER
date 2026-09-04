// NER Logistics AI - Remote District Accessibility Index (RDAI)
// Measuring logistical friction, terrain isolation, weather vulnerability, and lifeline redundancy

export const DISTRICTS = [
  {
    id: 'DIST-AR-01',
    name: 'Kurung Kumey',
    state: 'Arunachal Pradesh',
    capital: 'Koloriang',
    population: 92076,
    areaSqKm: 6340,
    coordinates: { lat: 27.9167, lng: 93.3333 },
    accessibilityScore: 38, // Out of 100 (Lower = more isolated)
    accessibilityTier: 'Critical Isolation', // Critical Isolation | Severe Constraint | Moderate Friction | Accessible
    factors: {
      terrainComplexity: 94, // 0-100
      weatherVulnerability: 88,
      bridgeRedundancy: 18,
      roadBitumenRatio: 26, // % paved
      nearestAirDroneHubKm: 140,
      averageTransitDaysToStateHub: 3.8
    },
    primaryCorridor: 'Koloriang-Palin Ridge Route',
    criticalLifeline: 'Kurung River Suspension Bailey Bridge',
    droneCorridorActive: true,
    keySuppliesStockDays: 9, // Critical food/medicine buffer
    recentHazard: 'Temporary wooden span swept by monsoon freshet'
  },
  {
    id: 'DIST-AS-02',
    name: 'Dima Hasao',
    state: 'Assam',
    capital: 'Haflong',
    population: 214102,
    areaSqKm: 4888,
    coordinates: { lat: 25.1833, lng: 93.0167 },
    accessibilityScore: 54,
    accessibilityTier: 'Severe Constraint',
    factors: {
      terrainComplexity: 82,
      weatherVulnerability: 85,
      bridgeRedundancy: 42,
      roadBitumenRatio: 58,
      nearestAirDroneHubKm: 85,
      averageTransitDaysToStateHub: 1.8
    },
    primaryCorridor: 'Lumding-Haflong-Silchar Hill Highway (NH-27)',
    criticalLifeline: 'Jatinga River Aqueduct & Railway Tunnel',
    droneCorridorActive: false,
    keySuppliesStockDays: 16,
    recentHazard: 'Soil slumping along Jatinga hill cuts'
  },
  {
    id: 'DIST-MZ-03',
    name: 'Saiha',
    state: 'Mizoram',
    capital: 'Saiha',
    population: 56574,
    areaSqKm: 1399,
    coordinates: { lat: 22.4833, lng: 92.9667 },
    accessibilityScore: 62,
    accessibilityTier: 'Moderate Friction',
    factors: {
      terrainComplexity: 80,
      weatherVulnerability: 74,
      bridgeRedundancy: 35,
      roadBitumenRatio: 64,
      nearestAirDroneHubKm: 160,
      averageTransitDaysToStateHub: 2.4
    },
    primaryCorridor: 'NH-54 Southern Extension (Aizawl-Lunglei-Saiha)',
    criticalLifeline: 'Chhimtuipui River Cable Way',
    droneCorridorActive: true,
    keySuppliesStockDays: 21,
    recentHazard: 'Road surface rutting on Kolodyne descent'
  },
  {
    id: 'DIST-NL-04',
    name: 'Mon',
    state: 'Nagaland',
    capital: 'Mon Town',
    population: 250671,
    areaSqKm: 1786,
    coordinates: { lat: 26.75, lng: 95.1 },
    accessibilityScore: 68,
    accessibilityTier: 'Moderate Friction',
    factors: {
      terrainComplexity: 78,
      weatherVulnerability: 70,
      bridgeRedundancy: 48,
      roadBitumenRatio: 62,
      nearestAirDroneHubKm: 90,
      averageTransitDaysToStateHub: 2.1
    },
    primaryCorridor: 'Sonari-Mon Interstate Highway',
    criticalLifeline: 'Tizit River RCC Bridge',
    droneCorridorActive: false,
    keySuppliesStockDays: 24,
    recentHazard: 'Minor boulder fall near km 34'
  },
  {
    id: 'DIST-ML-05',
    name: 'East Khasi Hills',
    state: 'Meghalaya',
    capital: 'Shillong',
    population: 825922,
    areaSqKm: 2748,
    coordinates: { lat: 25.5667, lng: 91.8833 },
    accessibilityScore: 89,
    accessibilityTier: 'Accessible',
    factors: {
      terrainComplexity: 58,
      weatherVulnerability: 62,
      bridgeRedundancy: 88,
      roadBitumenRatio: 94,
      nearestAirDroneHubKm: 25,
      averageTransitDaysToStateHub: 0.4
    },
    primaryCorridor: 'Guwahati-Shillong 4-Lane Expressway (NH-06)',
    criticalLifeline: 'Umiam Dam Bypass Viaduct',
    droneCorridorActive: true,
    keySuppliesStockDays: 45,
    recentHazard: 'Heavy valley fog during morning hours'
  },
  {
    id: 'DIST-SK-06',
    name: 'Mangan (North Sikkim)',
    state: 'Sikkim',
    capital: 'Mangan',
    population: 43709,
    areaSqKm: 4226,
    coordinates: { lat: 27.5167, lng: 88.5333 },
    accessibilityScore: 42,
    accessibilityTier: 'Critical Isolation',
    factors: {
      terrainComplexity: 98,
      weatherVulnerability: 95,
      bridgeRedundancy: 22,
      roadBitumenRatio: 44,
      nearestAirDroneHubKm: 110,
      averageTransitDaysToStateHub: 3.2
    },
    primaryCorridor: 'Dikchu-Sankalang-Chungthang Corridor',
    criticalLifeline: 'Teesta Sangam Bridge',
    droneCorridorActive: true,
    keySuppliesStockDays: 12,
    recentHazard: 'Glacial outburst debris cleared, single lane open'
  },
  {
    id: 'DIST-MN-07',
    name: 'Tamenglong',
    state: 'Manipur',
    capital: 'Tamenglong',
    population: 140651,
    areaSqKm: 4391,
    coordinates: { lat: 24.9833, lng: 93.4833 },
    accessibilityScore: 51,
    accessibilityTier: 'Severe Constraint',
    factors: {
      terrainComplexity: 86,
      weatherVulnerability: 82,
      bridgeRedundancy: 38,
      roadBitumenRatio: 52,
      nearestAirDroneHubKm: 95,
      averageTransitDaysToStateHub: 2.6
    },
    primaryCorridor: 'Imphal-Tamenglong Road / Old Cachar Road',
    criticalLifeline: 'Irang River Girder Bridge',
    droneCorridorActive: false,
    keySuppliesStockDays: 14,
    recentHazard: 'Mud logging from intense monsoon downpours'
  },
  {
    id: 'DIST-TR-08',
    name: 'Dhalai',
    state: 'Tripura',
    capital: 'Ambassa',
    population: 378230,
    areaSqKm: 2400,
    coordinates: { lat: 23.9167, lng: 91.85 },
    accessibilityScore: 74,
    accessibilityTier: 'Moderate Friction',
    factors: {
      terrainComplexity: 52,
      weatherVulnerability: 60,
      bridgeRedundancy: 70,
      roadBitumenRatio: 81,
      nearestAirDroneHubKm: 70,
      averageTransitDaysToStateHub: 1.1
    },
    primaryCorridor: 'Agartala-Silchar National Highway (NH-08)',
    criticalLifeline: 'Manu River Bridge at Ambassa',
    droneCorridorActive: true,
    keySuppliesStockDays: 28,
    recentHazard: 'Minor waterlogging in market approaches'
  }
];
