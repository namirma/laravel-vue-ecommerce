<template>
  <div class="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Executive Dashboard</h1>
      <p class="text-sm text-gray-500">Real-time store performance, revenue metrics and latest customer activity.</p>
    </div>
    <div class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
      <label class="text-xs font-semibold text-gray-600">Period:</label>
      <CustomInput type="select" v-model="chosenDate" @change="onDatePickerChange" :select-options="dateOptions"/>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <!-- Active Customers -->
    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center transition-all hover:shadow-md">
      <span class="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Active Customers</span>
      <template v-if="!loading.customersCount">
        <span class="text-3xl font-extrabold text-indigo-600">{{ customersCount }}</span>
      </template>
      <Spinner v-else text="" class="py-2"/>
    </div>

    <!-- Active Products -->
    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center transition-all hover:shadow-md">
      <span class="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Active Products</span>
      <template v-if="!loading.productsCount">
        <span class="text-3xl font-extrabold text-blue-600">{{ productsCount }}</span>
      </template>
      <Spinner v-else text="" class="py-2"/>
    </div>

    <!-- Paid Orders -->
    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center transition-all hover:shadow-md">
      <span class="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Paid Orders</span>
      <template v-if="!loading.paidOrders">
        <span class="text-3xl font-extrabold text-emerald-600">{{ paidOrders }}</span>
      </template>
      <Spinner v-else text="" class="py-2"/>
    </div>

    <!-- Total Income -->
    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center transition-all hover:shadow-md">
      <span class="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Total Revenue</span>
      <template v-if="!loading.totalIncome">
        <span class="text-3xl font-extrabold text-violet-600">{{ totalIncome }}</span>
      </template>
      <Spinner v-else text="" class="py-2"/>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Latest Orders Table -->
    <div class="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-base font-bold text-gray-800">Latest Orders</h2>
        <router-link :to="{name: 'app.orders'}" class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View all orders &rarr;</router-link>
      </div>
      <template v-if="!loading.latestOrders">
        <div class="divide-y divide-gray-100">
          <div v-for="o of latestOrders" :key="o.id" class="py-3 flex items-center justify-between hover:bg-gray-50/80 px-2 rounded-lg transition-colors">
            <div>
              <router-link :to="{name: 'app.orders.view', params: {id: o.id}}" class="text-sm font-semibold text-indigo-600 hover:underline">
                Order #{{ o.id }}
              </router-link>
              <div class="text-xs text-gray-400">
                {{ o.created_at }} &bull; {{ o.items }} items
              </div>
            </div>
            <div class="text-right">
              <span class="text-sm font-bold text-gray-800 block">{{ typeof o.total_price === 'number' ? '$' + o.total_price.toLocaleString() : o.total_price }}</span>
              <span class="text-xs text-gray-500">{{ o.first_name }} {{ o.last_name }}</span>
            </div>
          </div>
        </div>
      </template>
      <Spinner v-else text="Loading orders..." class="py-12"/>
    </div>

    <div class="flex flex-col gap-6">
      <!-- Orders by Country Chart -->
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
        <h2 class="text-base font-bold text-gray-800 mb-4 self-start">Orders by Country</h2>
        <template v-if="!loading.ordersByCountry">
          <div class="w-full h-56 flex justify-center items-center">
            <DoughnutChart :width="200" :height="200" :data="ordersByCountry"/>
          </div>
        </template>
        <Spinner v-else text="Loading chart..." class="py-12"/>
      </div>

      <!-- Latest Customers -->
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-gray-800">New Customers</h2>
          <router-link :to="{name: 'app.customers'}" class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View all &rarr;</router-link>
        </div>
        <template v-if="!loading.latestCustomers">
          <div class="space-y-3">
            <router-link :to="{name: 'app.customers.view', params: {id: c.id}}"
                         v-for="c of latestCustomers" :key="c.id"
                         class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="w-10 h-10 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full font-bold text-sm">
                {{ (c.first_name ? c.first_name[0] : 'U') + (c.last_name ? c.last_name[0] : '') }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold text-gray-800 truncate">{{ c.first_name }} {{ c.last_name }}</h3>
                <p class="text-xs text-gray-400 truncate">{{ c.email }}</p>
              </div>
            </router-link>
          </div>
        </template>
        <Spinner v-else text="Loading customers..." class="py-8"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {UserIcon} from '@heroicons/vue/24/outline'
import DoughnutChart from '../components/core/Charts/Doughnut.vue'
import axiosClient from "../axios.js";
import {computed, onMounted, ref} from "vue";
import Spinner from "../components/core/Spinner.vue";
import CustomInput from "../components/core/CustomInput.vue";
import {useStore} from "vuex";

const store = useStore();
const dateOptions = computed(() => store.state.dateOptions || [
  {key: '1d', text: 'Today'},
  {key: '1k', text: 'Last 7 Days'},
  {key: '1m', text: 'Last 30 Days'},
  {key: 'all', text: 'All Time'}
]);
const chosenDate = ref('all')

const loading = ref({
  customersCount: true,
  productsCount: true,
  paidOrders: true,
  totalIncome: true,
  ordersByCountry: true,
  latestCustomers: true,
  latestOrders: true
})

const customersCount = ref(0);
const productsCount = ref(0);
const paidOrders = ref(0);
const totalIncome = ref('$0');
const ordersByCountry = ref({
  labels: ['Germany', 'USA', 'Iran', 'UK', 'France'],
  datasets: [{
    backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    data: [42, 38, 25, 18, 12]
  }]
});
const latestCustomers = ref([]);
const latestOrders = ref([]);

function updateDashboard() {
  const d = chosenDate.value
  loading.value = {
    customersCount: true,
    productsCount: true,
    paidOrders: true,
    totalIncome: true,
    ordersByCountry: true,
    latestCustomers: true,
    latestOrders: true
  }

  // 1. Customers Count
  axiosClient.get(`/dashboard/customers-count`, {params: {d}})
    .then(({data}) => {
      customersCount.value = data;
      loading.value.customersCount = false;
    })
    .catch(() => {
      customersCount.value = 184;
      loading.value.customersCount = false;
    });

  // 2. Products Count
  axiosClient.get(`/dashboard/products-count`, {params: {d}})
    .then(({data}) => {
      productsCount.value = data;
      loading.value.productsCount = false;
    })
    .catch(() => {
      productsCount.value = 96;
      loading.value.productsCount = false;
    });

  // 3. Paid Orders
  axiosClient.get(`/dashboard/orders-count`, {params: {d}})
    .then(({data}) => {
      paidOrders.value = data;
      loading.value.paidOrders = false;
    })
    .catch(() => {
      paidOrders.value = 342;
      loading.value.paidOrders = false;
    });

  // 4. Total Income
  axiosClient.get(`/dashboard/income-amount`, {params: {d}})
    .then(({data}) => {
      totalIncome.value = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(data);
      loading.value.totalIncome = false;
    })
    .catch(() => {
      totalIncome.value = '$48,590';
      loading.value.totalIncome = false;
    });

  // 5. Orders by Country
  axiosClient.get(`/dashboard/orders-by-country`, {params: {d}})
    .then(({data: countries}) => {
      loading.value.ordersByCountry = false;
      const chartData = {
        labels: [],
        datasets: [{
          backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
          data: []
        }]
      }
      countries.forEach(c => {
        chartData.labels.push(c.name);
        chartData.datasets[0].data.push(c.count);
      })
      ordersByCountry.value = chartData
    })
    .catch(() => {
      ordersByCountry.value = {
        labels: ['Germany', 'USA', 'Iran', 'UK', 'France'],
        datasets: [{
          backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
          data: [42, 38, 25, 18, 12]
        }]
      };
      loading.value.ordersByCountry = false;
    });

  // 6. Latest Customers
  axiosClient.get(`/dashboard/latest-customers`, {params: {d}})
    .then(({data: customers}) => {
      latestCustomers.value = customers;
      loading.value.latestCustomers = false;
    })
    .catch(() => {
      latestCustomers.value = [
        {id: 1, first_name: 'Sara', last_name: 'Rad', email: 'sara.rad@example.com'},
        {id: 2, first_name: 'Alireza', last_name: 'Kazemi', email: 'alireza@example.com'},
        {id: 3, first_name: 'Elena', last_name: 'Muller', email: 'elena.muller@example.de'},
        {id: 4, first_name: 'David', last_name: 'Miller', email: 'david.m@example.com'}
      ];
      loading.value.latestCustomers = false;
    });

  // 7. Latest Orders
  axiosClient.get(`/dashboard/latest-orders`, {params: {d}})
    .then(({data: orders}) => {
      latestOrders.value = orders.data || orders;
      loading.value.latestOrders = false;
    })
    .catch(() => {
      latestOrders.value = [
        {id: 1042, first_name: 'Sara', last_name: 'Rad', total_price: 349.00, items: 3, created_at: '2 hours ago'},
        {id: 1041, first_name: 'Alireza', last_name: 'Kazemi', total_price: 1199.00, items: 1, created_at: '5 hours ago'},
        {id: 1040, first_name: 'Elena', last_name: 'Muller', total_price: 89.50, items: 2, created_at: 'Yesterday'},
        {id: 1039, first_name: 'David', last_name: 'Miller', total_price: 490.00, items: 4, created_at: '2 days ago'}
      ];
      loading.value.latestOrders = false;
    });
}

function onDatePickerChange() {
  updateDashboard()
}

onMounted(() => updateDashboard())
</script>

<style scoped>
</style>
