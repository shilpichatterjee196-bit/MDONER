// NER Logistics AI - Vehicle Telematics & Fleet Service
import { VEHICLES } from '../data/vehicles';
import { simulateDelay, storage } from './api';

const STORAGE_KEY = 'vehicles_fleet';

export const vehicleService = {
  async getAllVehicles() {
    await simulateDelay();
    return storage.get(STORAGE_KEY, VEHICLES);
  },

  async getVehicleById(id) {
    await simulateDelay();
    const list = storage.get(STORAGE_KEY, VEHICLES);
    return list.find((v) => v.id === id) || null;
  },

  async updateTelemetry(id, telemetryUpdates) {
    await simulateDelay();
    const list = storage.get(STORAGE_KEY, VEHICLES);
    const updated = list.map((v) => {
      if (v.id === id) {
        return {
          ...v,
          telemetry: { ...v.telemetry, ...telemetryUpdates },
          lastPing: 'Just now'
        };
      }
      return v;
    });
    storage.set(STORAGE_KEY, updated);
    return updated.find((v) => v.id === id);
  },

  async registerVehicle(newVehicle) {
    await simulateDelay();
    const list = storage.get(STORAGE_KEY, VEHICLES);
    const created = {
      ...newVehicle,
      id: newVehicle.id || `NER-TRK-${Math.floor(100 + Math.random() * 900)}`,
      lastPing: 'Just now'
    };
    const updated = [created, ...list];
    storage.set(STORAGE_KEY, updated);
    return created;
  }
};
