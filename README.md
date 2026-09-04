# 🚚 NER Logistics AI (SIH26002)

> **AI-Based Smart Logistics and Remote Accessibility Intelligence Platform for the North Eastern Region (NER)**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.14-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18.2-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)]()

---

## 📌 Project Overview

**NER Logistics AI** is an operational spatial intelligence command platform engineered for the 8 North Eastern States of India (Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Sikkim).

The platform addresses severe logistical bottlenecks caused by Himalayan landslides, monsoon river floods along the Brahmaputra, sub-zero high-altitude black ice, and single-corridor vulnerabilities by integrating **all-terrain road convoys**, **Brahmaputra NW-2 river barges**, and **autonomous VTOL cargo drones** into a unified intelligence center.

---

## ✨ Core Features & Modules

1. **Executive Operations Dashboard (`/`)**:
   - Real-time fleet KPI counters, active convoys telemetry, and live hazard stream.
   - Dynamic AI intelligence ticker & operational scenario filters.
   - High-priority corridor health monitor.

2. **NER Live GIS Telemetry & Terrain Map (`/live-map`)**:
   - Interactive Leaflet GIS map with custom animated SVG markers for 142 vehicles.
   - Layer toggles (Vehicles, Corridors, Hazards, Supply Hubs, Danger Polygons).
   - 8-State quick camera flyTo controls and slide-up telemetry inspection drawer.

3. **AI Multi-Modal Route Optimization (`/route-optimization`)**:
   - Heuristic multi-modal routing engine evaluating terrain friction, IMD radar, and consignment constraints.
   - 4-stage sequential inference sequence.
   - Step-by-step multi-modal dispatch waypoints & alternative highway comparison.

4. **Fleet Telematics & Vehicle Registry (`/vehicles`)**:
   - 142 assets categorized across 6x6 trucks, NW-2 river barges, VTOL drones, and cold-chain medical rovers.
   - Live telemetry pings (speed, battery/fuel, engine temp, altitude, satellite lock).

5. **Remote District Accessibility Index (RDAI) (`/accessibility`)**:
   - Multi-factor vulnerability scoring model (0–100) evaluating terrain complexity, weather risk, road paving, and lifeline buffer stocks.
   - Interactive Monsoon Flood Stress-Test simulator.

6. **Emergency Alerts & Incident Triage Command (`/alerts`)**:
   - BRO (Border Roads Organisation) heavy equipment clearance progress tracking (+20% increments).
   - High-priority Emergency SOS SatCom broadcast protocol.

7. **Crowdsourced Field Hazard Reports (`/field-reports`)**:
   - Grassroots driver and volunteer hazard reporting with community upvoting.
   - Automatic verification badge when reports reach ≥ 10 votes.

8. **SLA Performance & Executive Analytics (`/analytics`)**:
   - Recharts visualizations: Multi-modal freight throughput dynamics (AreaChart), modal share (Donut), hazard clearance delay hours (BarChart), and state performance table.
   - Official MoDONER / NEC government dossier export.

9. **System Configuration & GIS Settings (`/settings`)**:
   - Telemetry ping rates, ISRO NavIC / GSAT-7 satellite provider selection, and offline cache synchronization.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1 (Single Page Application)
- **Build Tool**: Vite 5.4.14
- **Styling**: Tailwind CSS 3.4.17 + Vanilla CSS Design Tokens (Orange & White Theme)
- **Mapping & GIS**: Leaflet 1.9.4 & React-Leaflet 4.2.1 with OpenStreetMap tiles
- **Data Visualizations**: Recharts 2.15.1
- **Animations**: Framer Motion 11.18.2
- **Iconography**: Lucide React 0.475.0
- **Routing**: React Router DOM 6.29.0
- **Storage**: Browser LocalStorage client simulator (`api.js`)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18.x or 22+ LTS)
- npm (Version 9.x or higher)

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📖 Comprehensive Documentation

For complete technical documentation, architectural diagrams, component APIs, judge presentation scripts, and limitations, refer to:
📄 [`NER_LOGISTICS_AI_DOCUMENTATION.txt`](./NER_LOGISTICS_AI_DOCUMENTATION.txt)

---

## 👥 Smart India Hackathon (SIH) 2026

- **Problem Statement ID**: SIH26002
- **Domain**: Smart Logistics & Remote Accessibility Intelligence
- **Region**: North Eastern Region (NER), India
