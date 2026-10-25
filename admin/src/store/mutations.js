export function setUser(state, user) {
  state.user.data = user;
}

export function setToken(state, token) {
  state.user.token = token;
  if (token) {
    sessionStorage.setItem('TOKEN', token);
  } else {
    sessionStorage.removeItem('TOKEN');
  }
}

export function setProducts(state, [loading, data = null]) {
  if (data) {
    state.products = {
      ...state.products,
      data: Array.isArray(data) ? data : (data.data || state.products.data),
      links: data.meta?.links || data.links || state.products.links || [],
      page: data.meta?.current_page || data.page || data.current_page || 1,
      limit: data.meta?.per_page || data.limit || data.per_page || 10,
      from: data.meta?.from || data.from || 1,
      to: data.meta?.to || data.to || (data.data ? data.data.length : state.products.data.length),
      total: data.meta?.total || data.total || (data.data ? data.data.length : state.products.data.length),
    };
  }
  state.products.loading = loading;
}

export function setUsers(state, [loading, data = null]) {
  if (data) {
    state.users = {
      ...state.users,
      data: Array.isArray(data) ? data : (data.data || state.users.data),
      links: data.meta?.links || data.links || state.users.links || [],
      page: data.meta?.current_page || data.page || data.current_page || 1,
      limit: data.meta?.per_page || data.limit || data.per_page || 10,
      from: data.meta?.from || data.from || 1,
      to: data.meta?.to || data.to || (data.data ? data.data.length : state.users.data.length),
      total: data.meta?.total || data.total || (data.data ? data.data.length : state.users.data.length),
    };
  }
  state.users.loading = loading;
}

export function setCustomers(state, [loading, data = null]) {
  if (data) {
    state.customers = {
      ...state.customers,
      data: Array.isArray(data) ? data : (data.data || state.customers.data),
      links: data.meta?.links || data.links || state.customers.links || [],
      page: data.meta?.current_page || data.page || data.current_page || 1,
      limit: data.meta?.per_page || data.limit || data.per_page || 10,
      from: data.meta?.from || data.from || 1,
      to: data.meta?.to || data.to || (data.data ? data.data.length : state.customers.data.length),
      total: data.meta?.total || data.total || (data.data ? data.data.length : state.customers.data.length),
    };
  }
  state.customers.loading = loading;
}

export function setOrders(state, [loading, data = null]) {
  if (data) {
    state.orders = {
      ...state.orders,
      data: Array.isArray(data) ? data : (data.data || state.orders.data),
      links: data.meta?.links || data.links || state.orders.links || [],
      page: data.meta?.current_page || data.page || data.current_page || 1,
      limit: data.meta?.per_page || data.limit || data.per_page || 10,
      from: data.meta?.from || data.from || 1,
      to: data.meta?.to || data.to || (data.data ? data.data.length : state.orders.data.length),
      total: data.meta?.total || data.total || (data.data ? data.data.length : state.orders.data.length),
    };
  }
  state.orders.loading = loading;
}

export function showToast(state, message) {
  state.toast.show = true;
  state.toast.message = message;
}

export function hideToast(state) {
  state.toast.show = false;
  state.toast.message = '';
}

export function setCountries(state, countries) {
  state.countries = Array.isArray(countries) ? countries : (countries?.data || state.countries);
}
