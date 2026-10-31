import axiosClient from "../axios";
import { isDemoMode } from "../config";
import {
  DEMO_TOKEN,
  demoCountries,
  demoCustomerDetail,
  demoCustomers,
  demoOrderDetail,
  demoOrders,
  demoProductImage,
  demoProducts,
  demoUser,
  demoUsers,
} from "../demo/demoData";

// In live mode an API failure is an error: the caller sees it and the
// list is left empty. In demo mode the same failure falls back to the
// demo rows in src/demo/demoData.js, so a preview works without an API.
function emptyPage() {
  return { data: [], links: [], from: 0, to: 0, total: 0 };
}

function filterAndSort(list, search, sortField, sortDirection, searchFields) {
  let rows = [...list];
  if (search) {
    const s = search.toLowerCase();
    rows = rows.filter((row) => {
      const fullName = row.first_name ? `${row.first_name} ${row.last_name ?? ''}` : '';
      return fullName.toLowerCase().includes(s) || searchFields.some((field) => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], row);
        return String(value ?? '').toLowerCase().includes(s);
      });
    });
  }
  if (sortField) {
    rows.sort((a, b) => {
      const fieldA = a[sortField] ?? '';
      const fieldB = b[sortField] ?? '';
      if (sortDirection === 'desc') {
        return fieldA < fieldB ? 1 : -1;
      }
      return fieldA > fieldB ? 1 : -1;
    });
  }
  return {
    data: rows,
    links: [],
    from: rows.length ? 1 : 0,
    to: rows.length,
    total: rows.length,
  };
}

export function getCurrentUser({ commit }) {
  return axiosClient.get('/user')
    .then(({ data }) => {
      commit('setUser', data);
      return data;
    })
    .catch((error) => {
      if (!isDemoMode) {
        commit('setUser', {});
        throw error;
      }
      commit('setUser', demoUser);
      return demoUser;
    });
}

export function login({ commit }, data) {
  return axiosClient.post('/login', data)
    .then(({ data }) => {
      commit('setUser', data.user);
      commit('setToken', data.token);
      return data;
    })
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      commit('setUser', demoUser);
      commit('setToken', DEMO_TOKEN);
      return { user: demoUser, token: DEMO_TOKEN };
    });
}

export function logout({ commit }) {
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

export function getCountries({ commit }) {
  return axiosClient.get('countries')
    .then(({ data }) => {
      commit('setCountries', data);
    })
    .catch((error) => {
      if (!isDemoMode) {
        commit('setCountries', []);
        throw error;
      }
      commit('setCountries', demoCountries);
    });
}

export function getOrders({ commit, state }, { url = null, search = '', per_page, sort_field, sort_direction } = {}) {
  commit('setOrders', [true]);
  url = url || '/orders';
  const params = {
    per_page: per_page || state.orders.limit,
  };
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction,
    },
  })
    .then((response) => {
      commit('setOrders', [false, response.data]);
    })
    .catch((error) => {
      if (!isDemoMode) {
        commit('setOrders', [false, emptyPage()]);
        throw error;
      }
      commit('setOrders', [false, filterAndSort(demoOrders, search, sort_field, sort_direction, ['id', 'customer.first_name', 'customer.last_name', 'status'])]);
    });
}

export function getOrder({ commit }, id) {
  return axiosClient.get(`/orders/${id}`)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      return demoOrderDetail(id);
    });
}

export function getProducts({ commit, state }, { url = null, search = '', per_page, sort_field, sort_direction } = {}) {
  commit('setProducts', [true]);
  url = url || '/products';
  const params = {
    per_page: per_page || state.products.limit,
  };
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction,
    },
  })
    .then((response) => {
      commit('setProducts', [false, response.data]);
    })
    .catch((error) => {
      if (!isDemoMode) {
        commit('setProducts', [false, emptyPage()]);
        throw error;
      }
      const base = state.products.data && state.products.data.length ? [...state.products.data] : demoProducts;
      commit('setProducts', [false, filterAndSort(base, search, sort_field, sort_direction, ['title'])]);
    });
}

export function getProduct({ commit, state }, id) {
  return axiosClient.get(`/products/${id}`)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const found = state.products.data.find((p) => p.id === parseInt(id));
      return {
        data: found || {
          id: id || 1,
          title: 'Sony WH-1000XM5 Wireless Headphones',
          description: 'Industry-leading noise cancelling with two processors and 8 microphones.',
          price: 399.99,
          image_url: demoProducts[0].image_url,
          published: true,
        },
      };
    });
}

export function createProduct({ commit, state }, product) {
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
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const newId = (state.products.data.length ? Math.max(...state.products.data.map((p) => p.id || 0)) : 0) + 1;
      const newProduct = {
        id: newId,
        title: product.title || 'New Product',
        description: product.description || '',
        price: parseFloat(product.price) || 99.00,
        image_url: demoProductImage,
        published: !!product.published,
        updated_at: new Date().toISOString().slice(0, 10),
      };
      state.products.data.unshift(newProduct);
      commit('showToast', 'Product created successfully');
      return { status: 201, data: newProduct };
    });
}

export function updateProduct({ commit, state }, product) {
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
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const index = state.products.data.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products.data[index] = {
          ...state.products.data[index],
          title: product.title,
          description: product.description,
          price: parseFloat(product.price),
          published: !!product.published,
          updated_at: new Date().toISOString().slice(0, 10),
        };
      }
      commit('showToast', 'Product updated successfully');
      return { status: 200, data: product };
    });
}

export function deleteProduct({ commit, state }, id) {
  return axiosClient.delete(`/products/${id}`)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const index = state.products.data.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products.data.splice(index, 1);
      }
      commit('showToast', 'Product deleted successfully');
      return { status: 204 };
    });
}

export function getUsers({ commit, state }, { url = null, search = '', per_page, sort_field, sort_direction } = {}) {
  commit('setUsers', [true]);
  url = url || '/users';
  const params = {
    per_page: per_page || state.users.limit,
  };
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction,
    },
  })
    .then((response) => {
      commit('setUsers', [false, response.data]);
    })
    .catch((error) => {
      if (!isDemoMode) {
        commit('setUsers', [false, emptyPage()]);
        throw error;
      }
      commit('setUsers', [false, filterAndSort(demoUsers, search, sort_field, sort_direction, ['name', 'email'])]);
    });
}

export function createUser({ commit, state }, user) {
  return axiosClient.post('/users', user)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const newUser = {
        id: (state.users.data.length ? Math.max(...state.users.data.map((u) => u.id || 0)) : 0) + 1,
        ...user,
        created_at: new Date().toISOString().slice(0, 10),
      };
      state.users.data.unshift(newUser);
      commit('showToast', 'User created successfully');
      return { status: 201, data: newUser };
    });
}

export function updateUser({ commit, state }, user) {
  return axiosClient.put(`/users/${user.id}`, user)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const index = state.users.data.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        state.users.data[index] = { ...state.users.data[index], ...user };
      }
      commit('showToast', 'User updated successfully');
      return { status: 200, data: user };
    });
}

export function getCustomers({ commit, state }, { url = null, search = '', per_page, sort_field, sort_direction } = {}) {
  commit('setCustomers', [true]);
  url = url || '/customers';
  const params = {
    per_page: per_page || state.customers.limit,
  };
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction,
    },
  })
    .then((response) => {
      commit('setCustomers', [false, response.data]);
    })
    .catch((error) => {
      if (!isDemoMode) {
        commit('setCustomers', [false, emptyPage()]);
        throw error;
      }
      commit('setCustomers', [false, filterAndSort(demoCustomers, search, sort_field, sort_direction, ['first_name', 'last_name', 'email'])]);
    });
}

export function getCustomer({ commit }, id) {
  return axiosClient.get(`/customers/${id}`)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      return demoCustomerDetail(id);
    });
}

export function createCustomer({ commit, state }, customer) {
  return axiosClient.post('/customers', customer)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const newCustomer = {
        id: (state.customers.data.length ? Math.max(...state.customers.data.map((c) => c.id || 0)) : 0) + 1,
        ...customer,
        status: 'active',
        created_at: new Date().toISOString().slice(0, 10),
      };
      state.customers.data.unshift(newCustomer);
      commit('showToast', 'Customer created successfully');
      return { status: 201, data: newCustomer };
    });
}

export function updateCustomer({ commit, state }, customer) {
  return axiosClient.put(`/customers/${customer.id}`, customer)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const index = state.customers.data.findIndex((c) => c.id === customer.id);
      if (index !== -1) {
        state.customers.data[index] = { ...state.customers.data[index], ...customer };
      }
      commit('showToast', 'Customer updated successfully');
      return { status: 200, data: customer };
    });
}

export function deleteCustomer({ commit, state }, customer) {
  return axiosClient.delete(`/customers/${customer.id}`)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const index = state.customers.data.findIndex((c) => c.id === customer.id);
      if (index !== -1) {
        state.customers.data.splice(index, 1);
      }
      commit('showToast', 'Customer deleted successfully');
      return { status: 204 };
    });
}

export function deleteUser({ commit, state }, id) {
  return axiosClient.delete(`/users/${id}`)
    .catch((error) => {
      if (!isDemoMode) {
        throw error;
      }
      const index = state.users.data.findIndex((u) => u.id === id);
      if (index !== -1) {
        state.users.data.splice(index, 1);
      }
      commit('showToast', 'Administrator removed successfully');
      return { status: 204 };
    });
}
