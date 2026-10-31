// Demo data for local preview only.
//
// This data is used ONLY when demo mode is enabled
// (VITE_DEMO_MODE=true, see src/config.js). It is never a substitute
// for API data in live mode: with demo mode off, a failed API call
// surfaces as an error instead of silently showing these rows.
// Keeping the demo rows in one module avoids the previous duplication
// of the same products, orders, customers and users across
// store/state.js and store/actions.js.

export const DEMO_TOKEN = 'demo-token';

export const demoUser = {
  id: 1,
  name: 'Demo Admin',
  email: 'demo@ecommerce.test',
  role: 'Super Admin',
};

export const demoProductImage =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200';

export const demoProducts = [
  {
    id: 1,
    title: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
    price: 399.99,
    published: true,
    updated_at: '2026-10-24 16:30',
  },
  {
    id: 2,
    title: 'Apple MacBook Pro 16" - M3 Max 36GB RAM / 1TB SSD',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
    price: 3499.0,
    published: true,
    updated_at: '2026-10-23 11:15',
  },
  {
    id: 3,
    title: 'Apple iPhone 16 Pro Max - 256GB Natural Titanium',
    image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200',
    price: 1199.0,
    published: true,
    updated_at: '2026-10-22 09:45',
  },
  {
    id: 4,
    title: 'Logitech MX Master 3S Advanced Ergonomic Wireless Mouse',
    image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200',
    price: 99.99,
    published: true,
    updated_at: '2026-10-21 18:20',
  },
  {
    id: 5,
    title: 'Dell UltraSharp 27" 4K HDR USB-C Professional Monitor',
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200',
    price: 549.5,
    published: true,
    updated_at: '2026-10-20 14:10',
  },
];

export const demoUsers = [
  { id: 1, name: 'Demo Admin', email: 'demo@ecommerce.test', role: 'Super Admin', created_at: '2026-01-10 10:00' },
  { id: 2, name: 'Elena Muller', email: 'elena@ecommerce.test', role: 'Catalog Manager', created_at: '2026-03-15 14:30' },
];

export const demoCustomers = [
  { id: 1, first_name: 'Sara', last_name: 'Rad', email: 'sara.rad@example.com', phone: '+98 912 345 6789', status: 'active', created_at: '2026-08-14' },
  { id: 2, first_name: 'Alireza', last_name: 'Kazemi', email: 'alireza@example.com', phone: '+98 935 111 2233', status: 'active', created_at: '2026-09-02' },
  { id: 3, first_name: 'Elena', last_name: 'Muller', email: 'elena.muller@example.de', phone: '+49 170 1234567', status: 'active', created_at: '2026-09-20' },
  { id: 4, first_name: 'David', last_name: 'Miller', email: 'david.m@example.com', phone: '+1 555 382 9102', status: 'active', created_at: '2026-10-01' },
];

export const demoOrders = [
  { id: 1042, created_at: '2026-10-25 09:30', status: 'paid', total_price: 349.0, number_of_items: 3, customer: { first_name: 'Sara', last_name: 'Rad', email: 'sara.rad@example.com' } },
  { id: 1041, created_at: '2026-10-25 08:15', status: 'shipped', total_price: 1199.0, number_of_items: 1, customer: { first_name: 'Alireza', last_name: 'Kazemi', email: 'alireza@example.com' } },
  { id: 1040, created_at: '2026-10-24 18:40', status: 'completed', total_price: 89.5, number_of_items: 2, customer: { first_name: 'Elena', last_name: 'Muller', email: 'elena.muller@example.de' } },
  { id: 1039, created_at: '2026-10-24 14:10', status: 'cancelled', total_price: 490.0, number_of_items: 4, customer: { first_name: 'David', last_name: 'Miller', email: 'david.m@example.com' } },
];

export const demoCountries = [
  { code: 'IR', name: 'Iran' },
  { code: 'DE', name: 'Germany' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
];

export function demoOrderDetail(id) {
  const items = [
    { id: 1, unit_price: 199.0, quantity: 1, product: { title: 'Sony WH-1000XM5 Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' } },
    { id: 2, unit_price: 75.0, quantity: 2, product: { title: 'Logitech MX Master 3S', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200' } },
  ];
  const address = { address1: 'Valiasr St., Tech Tower', address2: 'Suite 402', city: 'Tehran', state: 'Tehran', zipcode: '19395', country: 'Iran', country_code: 'IR' };
  return {
    data: {
      id: id || 1042,
      created_at: '2026-10-25 09:30',
      status: 'paid',
      total_price: 349.0,
      items,
      order_items: items,
      customer: {
        first_name: 'Sara',
        last_name: 'Rad',
        email: 'sara.rad@example.com',
        phone: '+98 912 345 6789',
        billingAddress: address,
        shippingAddress: address,
      },
      billingAddress: address,
      shippingAddress: address,
    },
  };
}

export function demoCustomerDetail(id) {
  return {
    data: {
      id: id || 1,
      first_name: 'Sara',
      last_name: 'Rad',
      email: 'sara.rad@example.com',
      phone: '+98 912 345 6789',
      status: 'active',
      billingAddress: { address1: 'Valiasr St.', city: 'Tehran', state: 'Tehran', zipcode: '19395', country_code: 'IR' },
      shippingAddress: { address1: 'Valiasr St.', city: 'Tehran', state: 'Tehran', zipcode: '19395', country_code: 'IR' },
    },
  };
}
