// NER Logistics AI - Hazard Alerts & Incident Triage Service
import { ALERTS } from '../data/alerts';
import { INCIDENTS } from '../data/incidents';
import { simulateDelay, storage } from './api';

const ALERTS_KEY = 'hazard_alerts';
const INCIDENTS_KEY = 'hazard_incidents';

export const alertService = {
  async getAllAlerts() {
    await simulateDelay();
    return storage.get(ALERTS_KEY, ALERTS);
  },

  async getAllIncidents() {
    await simulateDelay();
    return storage.get(INCIDENTS_KEY, INCIDENTS);
  },

  async broadcastSosAlert(newAlert) {
    await simulateDelay();
    const currentAlerts = storage.get(ALERTS_KEY, ALERTS);
    const createdAlert = {
      ...newAlert,
      id: `ALT-${Math.floor(2000 + Math.random() * 8000)}`,
      severity: newAlert.severity || 'Critical',
      status: 'Active',
      reportedAt: 'Just now',
      source: 'Central Operations Command Broadcast'
    };
    const updated = [createdAlert, ...currentAlerts];
    storage.set(ALERTS_KEY, updated);
    return createdAlert;
  },

  async resolveIncident(incidentId) {
    await simulateDelay();
    const list = storage.get(INCIDENTS_KEY, INCIDENTS);
    const updated = list.map((inc) => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: 'Resolved',
          progressPercentage: 100
        };
      }
      return inc;
    });
    storage.set(INCIDENTS_KEY, updated);
    return updated.find((inc) => inc.id === incidentId);
  }
};
