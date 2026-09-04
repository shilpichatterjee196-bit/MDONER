// NER Logistics AI - Core API & Storage Client Simulator
// Supports simulated network latency and offline local storage fallback

const SIMULATED_LATENCY_MS = 150;

export async function simulateDelay(ms = SIMULATED_LATENCY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const storage = {
  get: (key, fallback) => {
    try {
      const data = localStorage.getItem(`ner_ai_${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(`ner_ai_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }
};
