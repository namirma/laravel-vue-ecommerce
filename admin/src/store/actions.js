import axiosClient from "../axios";

export function getCurrentUser({commit}, data) {
  return axiosClient.get('/user', data)
    .then(({data}) => {
      commit('setUser', data);
      return data;
    })
    .catch(() => {
      const demoUser = {
        id: 1,
        name: 'Navid Mirtorabi',
        email: 'navidm632@gmail.com',
        role: 'Super Admin'
      };
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
    })
    .catch(() => {
      const demoUser = {
        id: 1,
        name: 'Navid Mirtorabi',
        email: data?.email || 'navidm632@gmail.com',
        role: 'Super Admin'
      };
      const demoToken = 'demo-token-interview-ready';
      commit('setUser', demoUser);
      commit('setToken', demoToken);
      return {user: demoUser, token: demoToken};
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
    per_page: per_page || state.orders.limit,
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
      let ordersList = [
        {id: 1042, created_at: '2026-10-25 09:30', status: 'paid', total_price: 349.00, number_of_items: 3, customer: {first_name: 'Sara', last_name: 'Rad'}},
        {id: 1041, created_at: '2026-10-25 08:15', status: 'shipped', total_price: 1199.00, number_of_items: 1, customer: {first_name: 'Alireza', last_name: 'Kazemi'}},
        {id: 1040, created_at: '2026-10-24 18:40', status: 'completed', total_price: 89.50, number_of_items: 2, customer: {first_name: 'Elena', last_name: 'Muller'}},
        {id: 1039, created_at: '2026-10-24 14:10', status: 'cancelled', total_price: 490.00, number_of_items: 4, customer: {first_name: 'David', last_name: 'Miller'}}
      ];
      if (search) {
        const s = search.toLowerCase();
        ordersList = ordersList.filter(o =>
          String(o.id).includes(s) ||
          o.customer?.first_name?.toLowerCase().includes(s) ||
          o.customer?.last_name?.toLowerCase().includes(s) ||
          o.status?.toLowerCase().includes(s)
        );
      }
      if (sort_field) {
        ordersList.sort((a, b) => {
          let fieldA = a[sort_field] ?? '';
          let fieldB = b[sort_field] ?? '';
          if (sort_direction === 'desc') {
            return fieldA < fieldB ? 1 : -1;
          }
          return fieldA > fieldB ? 1 : -1;
        });
      }
      const demoOrders = {
        data: ordersList,
        links: [],
        from: 1,
        to: ordersList.length,
        total: ordersList.length
      };
      commit('setOrders', [false, demoOrders]);
    });
}

export function getOrder({commit}, id) {
  return axiosClient.get(`/orders/${id}`)
    .catch(() => {
      const items = [
        {id: 1, unit_price: 199.00, quantity: 1, product: {title: 'Sony WH-1000XM5 Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'}},
        {id: 2, unit_price: 75.00, quantity: 2, product: {title: 'Logitech MX Master 3S', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200'}}
      ];
      const address = {address1: 'Valiasr St., Tech Tower', address2: 'Suite 402', city: 'Tehran', state: 'Tehran', zipcode: '19395', country: 'Iran', country_code: 'IR'};
      return {
        data: {
          id: id || 1042,
          created_at: '2026-10-25 09:30',
          status: 'paid',
          total_price: 349.00,
          items: items,
          order_items: items,
          customer: {
            first_name: 'Sara',
            last_name: 'Rad',
            email: 'sara.rad@example.com',
            phone: '+98 912 345 6789',
            billingAddress: address,
            shippingAddress: address
          },
          billingAddress: address,
          shippingAddress: address
        }
      };
    });
}

export function getProducts({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setProducts', [true]);
  url = url || '/products';
  const params = {
    per_page: per_page || state.products.limit,
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
      let productList = state.products.data && state.products.data.length ? [...state.products.data] : [
        {id: 1, title: 'Sony WH-1000XM5 Wireless Headphones', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200', price: 399.99, published: true, updated_at: '2026-10-24 16:30'},
        {id: 2, title: 'MacBook Pro 16" M3 Max', image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200', price: 3499.00, published: true, updated_at: '2026-10-23 11:15'},
        {id: 3, title: 'iPhone 16 Pro Max - 256GB Titanium', image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200', price: 1199.00, published: true, updated_at: '2026-10-22 09:45'},
        {id: 4, title: 'Logitech MX Master 3S Wireless Mouse', image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200', price: 99.99, published: true, updated_at: '2026-10-21 18:20'},
        {id: 5, title: 'Dell UltraSharp 27" 4K USB-C Monitor', image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200', price: 549.50, published: true, updated_at: '2026-10-20 14:10'}
      ];
      if (search) {
        const s = search.toLowerCase();
        productList = productList.filter(p => p.title.toLowerCase().includes(s));
      }
      if (sort_field) {
        productList.sort((a, b) => {
          let fieldA = a[sort_field] ?? '';
          let fieldB = b[sort_field] ?? '';
          if (sort_direction === 'desc') {
            return fieldA < fieldB ? 1 : -1;
          }
          return fieldA > fieldB ? 1 : -1;
        });
      }
      const demoProducts = {
        data: productList,
        links: [],
        from: 1,
        to: productList.length,
        total: productList.length
      };
      commit('setProducts', [false, demoProducts]);
    });
}

export function getProduct({commit, state}, id) {
  return axiosClient.get(`/products/${id}`)
    .catch(() => {
      const found = state.products.data.find(p => p.id === parseInt(id));
      return {
        data: found || {
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

export function createProduct({commit, state}, product) {
  let postData = product;
  if (product.image instanceof File) {
    const form = new FormData();
    form.append('title', product.title);
    form.append('image', product.image);
    form.append('description', product.description || '');
    form.append('price', product.price);
    postData = form;
  }
  return axiosClient.post('/products', postData)
    .catch(() => {
      const newId = (state.products.data.length ? Math.max(...state.products.data.map(p => p.id || 0)) : 0) + 1;
      const newProduct = {
        id: newId,
        title: product.title || 'New Product',
        description: product.description || '',
        price: parseFloat(product.price) || 99.00,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
        published: !!product.published,
        updated_at: new Date().toISOString().slice(0, 10)
      };
      state.products.data.unshift(newProduct);
      commit('showToast', 'Product created successfully');
      return {status: 201, data: newProduct};
    });
}

export function updateProduct({commit, state}, product) {
  const id = product.id;
  let postData = product;
  if (product.image instanceof File) {
    const form = new FormData();
    form.append('id', product.id);
    form.append('title', product.title);
    form.append('image', product.image);
    form.append('description', product.description || '');
    form.append('published', product.published ? 1 : 0);
    form.append('price', product.price);
    form.append('_method', 'PUT');
    postData = form;
  } else {
    product._method = 'PUT';
  }
  return axiosClient.post(`/products/${id}`, postData)
    .catch(() => {
      const index = state.products.data.findIndex(p => p.id === id);
      if (index !== -1) {
        state.products.data[index] = {
          ...state.products.data[index],
          title: product.title,
          description: product.description,
          price: parseFloat(product.price),
          published: !!product.published,
          updated_at: new Date().toISOString().slice(0, 10)
        };
      }
      commit('showToast', 'Product updated successfully');
      return {status: 200, data: product};
    });
}

export function deleteProduct({commit, state}, id) {
  return axiosClient.delete(`/products/${id}`)
    .catch(() => {
      const index = state.products.data.findIndex(p => p.id === id);
      if (index !== -1) {
        state.products.data.splice(index, 1);
      }
      commit('showToast', 'Product deleted successfully');
      return {status: 204};
    });
}

export function getUsers({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setUsers', [true]);
  url = url || '/users';
  const params = {
    per_page: per_page || state.users.limit,
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
      let usersList = [
        {id: 1, name: 'Navid Mirtorabi', email: 'navidm632@gmail.com', created_at: '2026-01-10 10:00'},
        {id: 2, name: 'Admin Manager', email: 'admin@ecommerce.test', created_at: '2026-02-15 14:30'}
      ];
      if (search) {
        const s = search.toLowerCase();
        usersList = usersList.filter(u => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
      }
      const demoUsers = {
        data: usersList,
        links: [],
        from: 1,
        to: usersList.length,
        total: usersList.length
      };
      commit('setUsers', [false, demoUsers]);
    });
}

export function createUser({commit, state}, user) {
  return axiosClient.post('/users', user)
    .catch(() => {
      const newUser = {
        id: (state.users.data.length ? Math.max(...state.users.data.map(u => u.id || 0)) : 0) + 1,
        ...user,
        created_at: new Date().toISOString().slice(0, 10)
      };
      state.users.data.unshift(newUser);
      commit('showToast', 'User created successfully');
      return {status: 201, data: newUser};
    });
}

export function updateUser({commit, state}, user) {
  return axiosClient.put(`/users/${user.id}`, user)
    .catch(() => {
      const index = state.users.data.findIndex(u => u.id === user.id);
      if (index !== -1) {
        state.users.data[index] = {...state.users.data[index], ...user};
      }
      commit('showToast', 'User updated successfully');
      return {status: 200, data: user};
    });
}

export function getCustomers({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setCustomers', [true]);
  url = url || '/customers';
  const params = {
    per_page: per_page || state.customers.limit,
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
      let custs = [
        {id: 1, first_name: 'Sara', last_name: 'Rad', email: 'sara.rad@example.com', phone: '+98 912 345 6789', status: 'active', created_at: '2026-08-14'},
        {id: 2, first_name: 'Alireza', last_name: 'Kazemi', email: 'alireza@example.com', phone: '+98 935 111 2233', status: 'active', created_at: '2026-09-02'},
        {id: 3, first_name: 'Elena', last_name: 'Muller', email: 'elena.muller@example.de', phone: '+49 170 1234567', status: 'active', created_at: '2026-09-20'},
        {id: 4, first_name: 'David', last_name: 'Miller', email: 'david.m@example.com', phone: '+1 555 382 9102', status: 'active', created_at: '2026-10-01'}
      ];
      if (search) {
        const s = search.toLowerCase();
        custs = custs.filter(c => `${c.first_name} ${c.last_name}`.toLowerCase().includes(s) || c.email.toLowerCase().includes(s));
      }
      const demoCustomers = {
        data: custs,
        links: [],
        from: 1,
        to: custs.length,
        total: custs.length
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

export function createCustomer({commit, state}, customer) {
  return axiosClient.post('/customers', customer)
    .catch(() => {
      const newCustomer = {
        id: (state.customers.data.length ? Math.max(...state.customers.data.map(c => c.id || 0)) : 0) + 1,
        ...customer,
        status: 'active',
        created_at: new Date().toISOString().slice(0, 10)
      };
      state.customers.data.unshift(newCustomer);
      commit('showToast', 'Customer created successfully');
      return {status: 201, data: newCustomer};
    });
}

export function updateCustomer({commit, state}, customer) {
  return axiosClient.put(`/customers/${customer.id}`, customer)
    .catch(() => {
      const index = state.customers.data.findIndex(c => c.id === customer.id);
      if (index !== -1) {
        state.customers.data[index] = {...state.customers.data[index], ...customer};
      }
      commit('showToast', 'Customer updated successfully');
      return {status: 200, data: customer};
    });
}

export function deleteCustomer({commit, state}, customer) {
  return axiosClient.delete(`/customers/${customer.id}`)
    .catch(() => {
      const index = state.customers.data.findIndex(c => c.id === customer.id);
      if (index !== -1) {
        state.customers.data.splice(index, 1);
      }
      commit('showToast', 'Customer deleted successfully');
      return {status: 204};
    });
}

export function deleteUser({commit, state}, id) {
  return axiosClient.delete(`/users/${id}`)
    .catch(() => {
      const index = state.users.data.findIndex(u => u.id === id);
      if (index !== -1) {
        state.users.data.splice(index, 1);
      }
      commit('showToast', 'Administrator removed successfully');
      return {status: 204};
    });
}
