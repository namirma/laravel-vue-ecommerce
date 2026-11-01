# Vue 3 Admin SPA

The admin backoffice for the Laravel e-commerce API in the parent directory.
It is a Vue 3 (Composition API) single-page application built with Vite,
styled with Tailwind CSS and charted with Chart.js via vue-chartjs.

## Setup

```bash
# from this directory (admin/)
npm install
npm run dev      # Vite dev server on port 3000
npm run build    # production build
```

## Configuration

Copy `.env.example` to `.env` and set the API base URL (without `/api`):

```bash
VITE_API_BASE_URL=http://localhost:8000
```

The API client (`src/axios.js`) appends `/api` and sends the Sanctum token
stored in the Vuex store.

## Demo mode (preview without an API)

Demo mode is **off by default**. With it off, failed API calls are real
errors and lists start empty — no sample data is injected.

```bash
VITE_DEMO_MODE=true npm run dev
```

In demo mode a banner says "Demo mode — showing sample data", the login
page shows a demo sign-in button, and all sample rows come from the single
source `src/demo/demoData.js`. Creates/updates/deletes only change the
local sample rows. Never enable demo mode against a real store.

## What is live and what is not

- Dashboard KPIs, latest customers/orders and orders-by-country come from
  the `/api/dashboard/*` endpoints.
- Report charts come from `/api/report/orders` and `/api/report/customers`.
  In live mode a failed report request leaves the chart empty.
- There is **no monthly-revenue API endpoint yet**, so the dashboard
  revenue line chart is empty in live mode and shows sample data only in
  demo mode.

## Structure

- `src/views/` — Dashboard, Products, Orders, Customers, Users, Reports,
  Login, password reset and NotFound views.
- `src/components/` — AppLayout, GuestLayout, Navbar, Sidebar and the
  reusable `core/` components (inputs, tables, toasts, Chart.js wrappers).
- `src/store/` — Vuex store (state, actions, mutations). Actions throw in
  live mode and fall back to demo rows only in demo mode.
- `src/router/` — Vue Router routes with `requiresAuth` / `requiresGuest`
  navigation guards.
- `src/demo/` — demo data, used only when `VITE_DEMO_MODE=true`.

## Stack (resolved versions in `package-lock.json`)

Vue 3.5, Vite 8, Tailwind CSS 4, Vue Router 5, Vuex 4, Chart.js 4,
vue-chartjs 5, axios 1.x, Headless UI, Heroicons v2.
