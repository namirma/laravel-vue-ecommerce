export default {
  user: {
    token: sessionStorage.getItem('TOKEN') || 'demo-token-interview-ready',
    data: {
      id: 1,
      name: 'Navid Mirtorabi',
      email: 'navidm632@gmail.com',
      role: 'Super Admin'
    }
  },
  products: {
    loading: false,
    data: [
      {
        id: 1,
        title: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
        price: 399.99,
        published: true,
        updated_at: '2026-10-24 16:30'
      },
      {
        id: 2,
        title: 'Apple MacBook Pro 16" - M3 Max 36GB RAM / 1TB SSD',
        image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
        price: 3499.00,
        published: true,
        updated_at: '2026-10-23 11:15'
      },
      {
        id: 3,
        title: 'Apple iPhone 16 Pro Max - 256GB Natural Titanium',
        image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200',
        price: 1199.00,
        published: true,
        updated_at: '2026-10-22 09:45'
      },
      {
        id: 4,
        title: 'Logitech MX Master 3S Advanced Ergonomic Wireless Mouse',
        image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200',
        price: 99.99,
        published: true,
        updated_at: '2026-10-21 18:20'
      },
      {
        id: 5,
        title: 'Dell UltraSharp 27" 4K HDR USB-C Professional Monitor',
        image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200',
        price: 549.50,
        published: true,
        updated_at: '2026-10-20 14:10'
      }
    ],
    links: [],
    from: 1,
    to: 5,
    page: 1,
    limit: 10,
    total: 5
  },
  users: {
    loading: false,
    data: [
      {id: 1, name: 'Navid Mirtorabi', email: 'navidm632@gmail.com', role: 'Super Admin', created_at: '2026-01-10 10:00'},
      {id: 2, name: 'Elena Muller', email: 'elena@ecommerce.test', role: 'Catalog Manager', created_at: '2026-03-15 14:30'}
    ],
    links: [],
    from: 1,
    to: 2,
    page: 1,
    limit: 10,
    total: 2
  },
  customers: {
    loading: false,
    data: [
      {id: 1, first_name: 'Sara', last_name: 'Rad', email: 'sara.rad@example.com', phone: '+98 912 345 6789', status: 'active', created_at: '2026-08-14'},
      {id: 2, first_name: 'Alireza', last_name: 'Kazemi', email: 'alireza@example.com', phone: '+98 935 111 2233', status: 'active', created_at: '2026-09-02'},
      {id: 3, first_name: 'Elena', last_name: 'Muller', email: 'elena.muller@example.de', phone: '+49 170 1234567', status: 'active', created_at: '2026-09-20'},
      {id: 4, first_name: 'David', last_name: 'Miller', email: 'david.m@example.com', phone: '+1 555 382 9102', status: 'active', created_at: '2026-10-01'}
    ],
    links: [],
    from: 1,
    to: 4,
    page: 1,
    limit: 10,
    total: 4
  },
  countries: [
    {code: 'IR', name: 'Iran'},
    {code: 'DE', name: 'Germany'},
    {code: 'US', name: 'United States'},
    {code: 'GB', name: 'United Kingdom'},
    {code: 'FR', name: 'France'}
  ],
  orders: {
    loading: false,
    data: [
      {
        id: 1042,
        created_at: '2026-10-25 09:30',
        status: 'paid',
        total_price: 349.00,
        number_of_items: 3,
        customer: {first_name: 'Sara', last_name: 'Rad', email: 'sara.rad@example.com'}
      },
      {
        id: 1041,
        created_at: '2026-10-25 08:15',
        status: 'shipped',
        total_price: 1199.00,
        number_of_items: 1,
        customer: {first_name: 'Alireza', last_name: 'Kazemi', email: 'alireza@example.com'}
      },
      {
        id: 1040,
        created_at: '2026-10-24 18:40',
        status: 'completed',
        total_price: 89.50,
        number_of_items: 2,
        customer: {first_name: 'Elena', last_name: 'Muller', email: 'elena.muller@example.de'}
      },
      {
        id: 1039,
        created_at: '2026-10-24 14:10',
        status: 'cancelled',
        total_price: 490.00,
        number_of_items: 4,
        customer: {first_name: 'David', last_name: 'Miller', email: 'david.m@example.com'}
      }
    ],
    links: [],
    from: 1,
    to: 4,
    page: 1,
    limit: 10,
    total: 4
  },
  toast: {
    show: false,
    message: '',
    delay: 5000
  },
  dateOptions: [
    {key: '1d', text: 'Today'},
    {key: '1k', text: 'Last 7 Days'},
    {key: '2k', text: 'Last 14 Days'},
    {key: '1m', text: 'Last 30 Days'},
    {key: '3m', text: 'Last 3 Months'},
    {key: 'all', text: 'All Time'},
  ]
}
