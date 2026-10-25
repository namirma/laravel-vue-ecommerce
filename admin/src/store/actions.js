import axiosClient from "../axios";

export function getCurrentUser({commit}, data) {
  return axiosClient.get('/user', data)
    .then(({data}) => {
      commit('setUser', data);
      return data;
    })
    .catch(() => {
      const demoUser = {name: 'Navid Mirtorabi', email: 'navidm632@gmail.com'};
      commit('setUser', demoUser);
      return demoUser;
    });
}

export function login({commit}, data) {
  return axiosClient.post('/login', data)
    .then(({data}) => {
      commit('setUser', data.user);
      commit('setToken', data.token);
      return data;
    });
}

export function logout({commit}) {
  return axiosClient.post('/logout')
    .then((response) => {
      commit('setToken', null);
      return response;
    })
    .catch(() => {
      commit('setToken', null);
      sessionStorage.removeItem('TOKEN');
    });
}

export function getCountries({commit}) {
  return axiosClient.get('countries')
    .then(({data}) => {
      commit('setCountries', data);
    })
    .catch(() => {
      commit('setCountries', [
        {code: 'IR', name: 'Iran'},
        {code: 'DE', name: 'Germany'},
        {code: 'US', name: 'United States'},
        {code: 'GB', name: 'United Kingdom'},
        {code: 'FR', name: 'France'}
      ]);
    });
}

export function getOrders({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setOrders', [true]);
  url = url || '/orders';
  const params = {
    per_page: state.orders.limit,
  };
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setOrders', [false, response.data]);
    })
    .catch(() => {
      const demoOrders = {
        data: [
          {id: 1042, created_at: '2026-10-25 09:30', status: 'paid', total_price: 349.00, number_of_items: 3, customer: {first_name: 'Sara', last_name: 'Rad'}},
          {id: 1041, created_at: '2026-10-25 08:15', status: 'shipped', total_price: 1199.00, number_of_items: 1, customer: {first_name: 'Alireza', last_name: 'Kazemi'}},
          {id: 1040, created_at: '2026-10-24 18:40', status: 'completed', total_price: 89.50, number_of_items: 2, customer: {first_name: 'Elena', last_name: 'Muller'}},
          {id: 1039, created_at: '2026-10-24 14:10', status: 'cancelled', total_price: 490.00, number_of_items: 4, customer: {first_name: 'David', last_name: 'Miller'}}
        ],
        links: [],
        from: 1,
        to: 4,
        total: 4
      };
      commit('setOrders', [false, demoOrders]);
    });
}

export function getOrder({commit}, id) {
  return axiosClient.get(`/orders/${id}`)
    .catch(() => {
      return {
        data: {
          id: id || 1042,
          created_at: '2026-10-25 09:30',
          status: 'paid',
          total_price: 349.00,
          order_items: [
            {id: 1, unit_price: 199.00, quantity: 1, product: {title: 'Sony WH-1000XM5 Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'}},
            {id: 2, unit_price: 75.00, quantity: 2, product: {title: 'Logitech MX Master 3S', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200'}}
          ],
          customer: {first_name: 'Sara', last_name: 'Rad', email: 'sara.rad@example.com', phone: '+98 912 345 6789'},
          billingAddress: {address1: 'Valiasr St.', city: 'Tehran', state: 'Tehran', zipcode: '19395', country_code: 'IR'},
          shippingAddress: {address1: 'Valiasr St.', city: 'Tehran', state: 'Tehran', zipcode: '19395', country_code: 'IR'}
        }
      };
    });
}

export function getProducts({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setProducts', [true]);
  url = url || '/products';
  const params = {
    per_page: state.products.limit,
  };
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setProducts', [false, response.data]);
    })
    .catch(() => {
      const demoProducts = {
        data: [
          {id: 1, title: 'Sony WH-1000XM5 Wireless Headphones', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200', price: 399.99, updated_at: '2026-10-24'},
          {id: 2, title: 'MacBook Pro 16" M3 Max', image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200', price: 3499.00, updated_at: '2026-10-23'},
          {id: 3, title: 'iPhone 16 Pro Max - 256GB Titanium', image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200', price: 1199.00, updated_at: '2026-10-22'},
          {id: 4, title: 'Logitech MX Master 3S Wireless Mouse', image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200', price: 99.99, updated_at: '2026-10-21'},
          {id: 5, title: 'Dell UltraSharp 27" 4K USB-C Monitor', image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200', price: 549.50, updated_at: '2026-10-20'}
        ],
        links: [],
        from: 1,
        to: 5,
        total: 5
      };
      commit('setProducts', [false, demoProducts]);
    });
}

export function getProduct({commit}, id) {
  return axiosClient.get(`/products/${id}`)
    .catch(() => {
      return {
        data: {
          id: id || 1,
          title: 'Sony WH-1000XM5 Wireless Headphones',
          description: 'Industry-leading noise cancelling with two processors and 8 microphones.',
          price: 399.99,
          image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
          published: true
        }
      };
    });
}

export function createProduct({commit}, product) {
  if (product.image instanceof File) {
    const form = new FormData();
    form.append('title', product.title);
    form.append('image', product.image);
    form.append('description', product.description);
    form.append('price', product.price);
    product = form;
  }
  return axiosClient.post('/products', product);
}

export function deleteProduct({commit}, id) {
  return axiosClient.delete(`/products/${id}`);
}

export function getUsers({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setUsers', [true]);
  url = url || '/users';
  const params = {
    per_page: state.users.limit,
  };
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setUsers', [false, response.data]);
    })
    .catch(() => {
      const demoUsers = {
        data: [
          {id: 1, name: 'Navid Mirtorabi', email: 'navidm632@gmail.com', created_at: '2026-01-10'},
          {id: 2, name: 'Admin Manager', email: 'admin@ecommerce.test', created_at: '2026-02-15'}
        ],
        links: [],
        from: 1,
        to: 2,
        total: 2
      };
      commit('setUsers', [false, demoUsers]);
    });
}

export function createUser({commit}, user) {
  return axiosClient.post('/users', user);
}

export function updateUser({commit}, user) {
  return axiosClient.put(`/users/${user.id}`, user);
}

export function getCustomers({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setCustomers', [true]);
  url = url || '/customers';
  const params = {
    per_page: state.customers.limit,
  };
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setCustomers', [false, response.data]);
    })
    .catch(() => {
      const demoCustomers = {
        data: [
          {id: 1, first_name: 'Sara', last_name: 'Rad', email: 'sara.rad@example.com', phone: '+98 912 345 6789', status: 'active', created_at: '2026-08-14'},
          {id: 2, first_name: 'Alireza', last_name: 'Kazemi', email: 'alireza@example.com', phone: '+98 935 111 2233', status: 'active', created_at: '2026-09-02'},
          {id: 3, first_name: 'Elena', last_name: 'Muller', email: 'elena.muller@example.de', phone: '+49 170 1234567', status: 'active', created_at: '2026-09-20'},
          {id: 4, first_name: 'David', last_name: 'Miller', email: 'david.m@example.com', phone: '+1 555 382 9102', status: 'active', created_at: '2026-10-01'}
        ],
        links: [],
        from: 1,
        to: 4,
        total: 4
      };
      commit('setCustomers', [false, demoCustomers]);
    });
}

export function getCustomer({commit}, id) {
  return axiosClient.get(`/customers/${id}`)
    .catch(() => {
      return {
        data: {
          id: id || 1,
          first_name: 'Sara',
          last_name: 'Rad',
          email: 'sara.rad@example.com',
          phone: '+98 912 345 6789',
          status: 'active',
          billingAddress: {address1: 'Valiasr St.', city: 'Tehran', state: 'Tehran', zipcode: '19395', country_code: 'IR'},
          shippingAddress: {address1: 'Valiasr St.', city: 'Tehran', state: 'Tehran', zipcode: '19395', country_code: 'IR'}
        }
      };
    });
}

export function createCustomer({commit}, customer) {
  return axiosClient.post('/customers', customer);
}

export function updateCustomer({commit}, customer) {
  return axiosClient.put(`/customers/${customer.id}`, customer);
}

export function deleteCustomer({commit}, customer) {
  return axiosClient.delete(`/customers/${customer.id}`);
}

export function updateProduct({commit}, product) {
  const id = product.id;
  if (product.image instanceof File) {
    const form = new FormData();
    form.append('id', product.id);
    form.append('title', product.title);
    form.append('image', product.image);
    form.append('description', product.description || '');
    form.append('published', product.published ? 1 : 0);
    form.append('price', product.price);
    form.append('_method', 'PUT');
    product = form;
  } else {
    product._method = 'PUT';
  }
  return axiosClient.post(`/products/${id}`, product);
}
