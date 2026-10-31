// Demo mode is opt-in and off by default.
//
// Enable it only for a local preview without a running Laravel API:
//   VITE_DEMO_MODE=true npm run dev
// With demo mode off, failed API calls are real errors (shown to the
// user) and no demo user, token or rows are injected into the store.
export const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
