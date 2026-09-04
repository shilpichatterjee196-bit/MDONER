// NER Logistics AI - Crowdsourced Ground Field Hazard Reports Service
import { simulateDelay, storage } from './api';

const INITIAL_REPORTS = [
  {
    id: 'RPT-301',
    reporter: 'Bhaskar Gogoi (Convoy Driver)',
    role: 'Commercial Driver',
    location: 'Haflong Ghati, Dima Hasao, Assam',
    coordinates: { lat: 25.1833, lng: 93.0167 },
    hazardType: 'Fallen Rock Debris & Sludge',
    severity: 'Warning',
    description: 'Boulders on right carriageway after night rain. Trucks passing one by one.',
    votes: 14,
    hasVoted: false,
    verified: true,
    timestamp: '25 mins ago'
  },
  {
    id: 'RPT-302',
    reporter: 'Tenzing Lepcha (Hill Specialist)',
    role: 'Local Volunteer',
    location: 'Singtam - Rangpo Link Road, Sikkim',
    coordinates: { lat: 27.2341, lng: 88.5012 },
    hazardType: 'Waterlogging & Deep Mud Ruts',
    severity: 'Warning',
    description: 'Stream overflow across road bed. Sedans stuck, 4x4 trucks can cross slowly.',
    votes: 9,
    hasVoted: false,
    verified: true,
    timestamp: '1 hour ago'
  },
  {
    id: 'RPT-303',
    reporter: 'Capt. Ranjit Saikia',
    role: 'River Pilot',
    location: 'Dhubri River Ghat Channel, Assam',
    coordinates: { lat: 26.0207, lng: 89.9744 },
    hazardType: 'Submerged Sandbank Siltation',
    severity: 'Info',
    description: 'Sandbar shifting ~30m eastward. Recommended channel depth only 2.1m at low tide.',
    votes: 19,
    hasVoted: false,
    verified: true,
    timestamp: '3 hours ago'
  }
];

const REPORTS_KEY = 'field_hazard_reports';

export const reportService = {
  async getAllReports() {
    await simulateDelay();
    return storage.get(REPORTS_KEY, INITIAL_REPORTS);
  },

  async submitReport(newReport) {
    await simulateDelay();
    const current = storage.get(REPORTS_KEY, INITIAL_REPORTS);
    const created = {
      ...newReport,
      id: `RPT-${Math.floor(400 + Math.random() * 600)}`,
      votes: 1,
      hasVoted: true,
      verified: false,
      timestamp: 'Just now'
    };
    const updated = [created, ...current];
    storage.set(REPORTS_KEY, updated);
    return created;
  },

  async upvoteReport(id) {
    await simulateDelay(80);
    const current = storage.get(REPORTS_KEY, INITIAL_REPORTS);
    const updated = current.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          votes: r.votes + 1,
          hasVoted: true
        };
      }
      return r;
    });
    storage.set(REPORTS_KEY, updated);
    return updated.find((r) => r.id === id);
  }
};
