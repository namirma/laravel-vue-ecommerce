// Initial store state: empty, not pre-filled with demo rows.
//
// Previously this file shipped a demo token, a named demo user and
// full demo product/order/customer lists, so the admin looked "live"
// even with no API running. Demo rows now live only in
// src/demo/demoData.js and are loaded only when demo mode is on
// (VITE_DEMO_MODE=true); in live mode the lists start empty and are
// filled from the API, or stay empty with an error shown.
export default {
  user: {
    token: sessionStorage.getItem('TOKEN') || null,
    data: null,
  },
  products: {
    loading: false,
    data: [],
    links: [],
    from: 0,
    to: 0,
    page: 1,
    limit: 10,
    total: 0,
  },
  users: {
    loading: false,
    data: [],
    links: [],
    from: 0,
    to: 0,
    page: 1,
    limit: 10,
    total: 0,
  },
  customers: {
    loading: false,
    data: [],
    links: [],
    from: 0,
    to: 0,
    page: 1,
    limit: 10,
    total: 0,
  },
  countries: [],
  orders: {
    loading: false,
    data: [],
    links: [],
    from: 0,
    to: 0,
    page: 1,
    limit: 10,
    total: 0,
  },
  toast: {
    show: false,
    message: '',
    delay: 5000,
  },
  dateOptions: [
    { key: '1d', text: 'Today' },
    { key: '1k', text: 'Last 7 Days' },
    { key: '2k', text: 'Last 14 Days' },
    { key: '1m', text: 'Last 30 Days' },
    { key: '3m', text: 'Last 3 Months' },
    { key: 'all', text: 'All Time' },
  ],
};
