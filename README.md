# Fleet Management System

An advanced Fleet Management Dashboard built with Next.js mapping, data visualization, and AI-powered insights.

## Technologies Used
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Charts:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Maps:** maplibre-gl and react-map-gl
- **Icons:** [Lucide React](https://lucide.dev/)

## Features
- **Interactive Dashboard:** Core fleet metrics, real-time alerts, and map visualization.
- **AI Insights (Fleet-Track GPT):** AI-powered summaries and anomaly detection for maintenance and fuel data.
- **Fuel & Costs Analytics:** Drill-down into fuel consumption trends, cost vs revenue, and recent refueling data (in SAR).
- **Maintenance Tracking:** Proactive scheduling, active fault codes, and vehicle health summaries.

## File Structure
```text
src/
├── app/
│   ├── (dashboard)/
│   │   ├── dayimGPT/          # AI Insights Page
│   │   ├── fuel-&-costs/      # Fuel and Costs Page
│   │   ├── maintenance/       # Maintenance & Diagnostics Page
│   │   ├── layout.tsx         # Dashboard Layout (Sidebar/Header)
│   │   └── page.tsx           # Main Dashboard Map/KPIs
│   ├── globals.css            # Global Styles (Tailwind)
│   └── layout.tsx             # Root Layout
├── components/
│   ├── dashboard/             # Dashboard Widgets & Views
│   ├── fuel-&-costs/          # Fuel & Costs Components
│   ├── maintenance/           # Maintenance Components
│   ├── ui/                    # Reusable shadcn/ui generic components
│   ├── app-header.tsx         # Top Navigation Header 
│   └── app-sidebar.tsx        # Collapsible Sidebar Menu
└── data/                      # Centralized Mock Data Files
    ├── dashboard.ts
    ├── fuel-analytics.ts
    ├── fuel-costs.tsx
    └── maintenance.ts
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Open the Application**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the live application.
