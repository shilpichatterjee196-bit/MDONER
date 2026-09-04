// NER Logistics AI - Multi-Modal Routing & Corridor Intelligence Service
import { ROUTES } from '../data/routes';
import { ALERTS } from '../data/alerts';
import { simulateDelay } from './api';

export const routeService = {
  async getAllRoutes() {
    await simulateDelay();
    return ROUTES;
  },

  async getRouteById(id) {
    await simulateDelay();
    return ROUTES.find((r) => r.id === id) || null;
  },

  async calculateOptimalPath(origin, destination, options = {}) {
    await simulateDelay(350); // Simulate AI optimization calculation time

    const { avoidLandslides = true, allowWaterway = true, allowDrone = true } = options;

    // Filter relevant routes matching or close to origin/dest
    const matchedRoute = ROUTES.find(
      (r) =>
        r.origin.name.toLowerCase().includes(origin.toLowerCase()) ||
        r.destination.name.toLowerCase().includes(destination.toLowerCase())
    ) || ROUTES[0];

    // Find hazards intersecting this corridor
    const activeHazards = ALERTS.filter((a) => a.corridorId === matchedRoute.id);

    return {
      recommended: {
        ...matchedRoute,
        activeAlertsCount: activeHazards.length,
        hazards: activeHazards,
        computedAt: new Date().toISOString(),
        efficiencyGainPercentage: allowWaterway ? 34 : 12
      },
      alternatives: ROUTES.filter((r) => r.id !== matchedRoute.id).slice(0, 2)
    };
  }
};
