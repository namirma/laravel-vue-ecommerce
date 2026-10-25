<template>
  <div class="space-y-6">
    <!-- Top Welcome & Controls Banner -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          Executive Dashboard <span class="text-lg">👋</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time metrics, transaction trends, and live storefront analytics for <strong class="text-slate-700 font-semibold">Navid Mirtorabi</strong>.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Date Filter -->
        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs">
          <CalendarIcon class="w-4 h-4 text-slate-400"/>
          <select v-model="chosenDate"
                  @change="onDatePickerChange"
                  class="bg-transparent border-0 p-0 text-xs font-semibold text-slate-700 focus:ring-0 cursor-pointer">
            <option v-for="opt of dateOptions" :key="opt.key" :value="opt.key">{{ opt.text }}</option>
          </select>
        </div>

        <!-- Quick Action: Add Product -->
        <router-link :to="{name: 'app.products'}"
                     class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition-all">
          <PlusIcon class="w-4 h-4"/>
          Add Product
        </router-link>
      </div>
    </div>

    <!-- 4 Modern Metric / KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 1. Total Revenue -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BanknotesIcon class="w-5 h-5"/>
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{{ totalIncome }}</span>
          <span class="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            &uarr; 14.8%
          </span>
        </div>
        <div class="mt-2 text-[11px] text-slate-400">vs. previous period</div>
      </div>

      <!-- 2. Paid Orders -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Paid Orders</span>
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShoppingBagIcon class="w-5 h-5"/>
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{{ paidOrders }}</span>
          <span class="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            &uarr; 8.2%
          </span>
        </div>
        <div class="mt-2 text-[11px] text-slate-400">Total fulfilled: 324</div>
      </div>

      <!-- 3. Active Customers -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Customers</span>
          <div class="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <UsersIcon class="w-5 h-5"/>
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{{ customersCount }}</span>
          <span class="inline-flex items-center text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            &uarr; 12.0%
          </span>
        </div>
        <div class="mt-2 text-[11px] text-slate-400">Across 18 regions</div>
      </div>

      <!-- 4. Active Products -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Products Catalog</span>
          <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <CubeIcon class="w-5 h-5"/>
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{{ productsCount }}</span>
          <span class="inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
            94 Active
          </span>
        </div>
        <div class="mt-2 text-[11px] text-slate-400">2 low in inventory</div>
      </div>
    </div>

    <!-- Charts Section: 2 Columns -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Revenue Growth Trend Line Chart -->
      <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-bold text-slate-900">Revenue & Sales Trajectory</h2>
            <p class="text-xs text-slate-400">Monthly net sales volume progression</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span>
            <span class="text-xs font-semibold text-slate-600">USD ($)</span>
          </div>
        </div>
        <div class="h-64 sm:h-72 w-full">
          <LineChart :width="400" :height="270" :data="revenueChartData"/>
        </div>
      </div>

      <!-- Right: Orders by Country Doughnut Chart -->
      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
        <div>
          <h2 class="text-base font-bold text-slate-900">Geographic Distribution</h2>
          <p class="text-xs text-slate-400">Top market destinations by orders</p>
        </div>
        <div class="h-56 flex items-center justify-center my-3">
          <DoughnutChart :width="200" :height="200" :data="ordersByCountry"/>
        </div>
        <div class="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
          <div>
            <span class="text-[10px] text-slate-400 uppercase font-semibold">Top Market</span>
            <p class="text-xs font-bold text-slate-800">Germany (31%)</p>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 uppercase font-semibold">2nd Market</span>
            <p class="text-xs font-bold text-slate-800">USA (28%)</p>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 uppercase font-semibold">3rd Market</span>
            <p class="text-xs font-bold text-slate-800">Iran (18%)</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tables Grid: Recent Orders & Top Customers -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Orders Table (2 Cols) -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900">Recent Customer Orders</h2>
            <p class="text-xs text-slate-400">Latest checkout transactions from the storefront</p>
          </div>
          <router-link :to="{name: 'app.orders'}" class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            All orders &rarr;
          </router-link>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th class="py-3 px-4">Order ID</th>
                <th class="py-3 px-4">Customer</th>
                <th class="py-3 px-4">Date</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr v-for="o of latestOrders" :key="o.id" class="hover:bg-slate-50/80 transition-colors">
                <td class="py-3 px-4 font-bold text-indigo-600">
                  <router-link :to="{name: 'app.orders.view', params: {id: o.id}}" class="hover:underline">
                    #{{ o.id }}
                  </router-link>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                      {{ o.first_name ? o.first_name[0] : 'C' }}
                    </div>
                    <span class="font-medium text-slate-900">{{ o.first_name }} {{ o.last_name }}</span>
                  </div>
                </td>
                <td class="py-3 px-4 text-slate-400">{{ o.created_at }}</td>
                <td class="py-3 px-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize"
                        :class="getStatusClass(o.status)">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDot(o.status)"></span>
                    {{ o.status || 'paid' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right font-extrabold text-slate-900">
                  {{ typeof o.total_price === 'number' ? '$' + o.total_price.toFixed(2) : o.total_price }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Customers Card (1 Col) -->
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-base font-bold text-slate-900">Recent Customers</h2>
              <p class="text-xs text-slate-400">Newly registered accounts</p>
            </div>
            <router-link :to="{name: 'app.customers'}" class="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
              View all &rarr;
            </router-link>
          </div>

          <div class="space-y-3">
            <router-link :to="{name: 'app.customers.view', params: {id: c.id}}"
                         v-for="c of latestCustomers" :key="c.id"
                         class="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 group-hover:from-indigo-100 group-hover:to-indigo-200 group-hover:text-indigo-700 transition-colors">
                {{ (c.first_name ? c.first_name[0] : 'U') + (c.last_name ? c.last_name[0] : '') }}
              </div>
              <div class="min-w-0 flex-1">
                <span class="text-xs font-bold text-slate-900 truncate block">{{ c.first_name }} {{ c.last_name }}</span>
                <span class="text-[11px] text-slate-400 truncate block">{{ c.email }}</span>
              </div>
              <ChevronRightIcon class="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors"/>
            </router-link>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Active Customer Base</span>
          <span class="font-bold text-indigo-600">184 Verified</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  BanknotesIcon,
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  CalendarIcon,
  PlusIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import LineChart from '../components/core/Charts/Line.vue'
import DoughnutChart from '../components/core/Charts/Doughnut.vue'
import axiosClient from "../axios.js";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

const store = useStore();
const dateOptions = computed(() => store.state.dateOptions || [
  {key: '1d', text: 'Today'},
  {key: '1k', text: 'Last 7 Days'},
  {key: '2k', text: 'Last 14 Days'},
  {key: '1m', text: 'Last 30 Days'},
  {key: 'all', text: 'All Time'}
]);
const chosenDate = ref('all')

const customersCount = ref(184);
const productsCount = ref(96);
const paidOrders = ref(342);
const totalIncome = ref('$48,590.00');

const revenueChartData = ref({
  labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      label: 'Monthly Net Sales ($)',
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      borderWidth: 3,
      pointBackgroundColor: '#4F46E5',
      pointBorderColor: '#fff',
      pointHoverRadius: 6,
      fill: true,
      tension: 0.35,
      data: [18200, 24500, 31200, 29800, 42100, 48590]
    }
  ]
});

const ordersByCountry = ref({
  labels: ['Germany', 'USA', 'Iran', 'UK', 'France'],
  datasets: [{
    backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    data: [42, 38, 25, 18, 12]
  }]
});

const latestCustomers = ref([
  {id: 1, first_name: 'Sara', last_name: 'Rad', email: 'sara.rad@example.com'},
  {id: 2, first_name: 'Alireza', last_name: 'Kazemi', email: 'alireza@example.com'},
  {id: 3, first_name: 'Elena', last_name: 'Muller', email: 'elena.muller@example.de'},
  {id: 4, first_name: 'David', last_name: 'Miller', email: 'david.m@example.com'}
]);

const latestOrders = ref([
  {id: 1042, first_name: 'Sara', last_name: 'Rad', total_price: 349.00, items: 3, status: 'paid', created_at: '2 hours ago'},
  {id: 1041, first_name: 'Alireza', last_name: 'Kazemi', total_price: 1199.00, items: 1, status: 'shipped', created_at: '5 hours ago'},
  {id: 1040, first_name: 'Elena', last_name: 'Muller', total_price: 89.50, items: 2, status: 'completed', created_at: 'Yesterday'},
  {id: 1039, first_name: 'David', last_name: 'Miller', total_price: 490.00, items: 4, status: 'cancelled', created_at: '2 days ago'}
]);

function getStatusClass(status) {
  switch (status) {
    case 'paid':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    case 'shipped':
      return 'bg-blue-50 text-blue-700 border border-blue-200';
    case 'completed':
      return 'bg-purple-50 text-purple-700 border border-purple-200';
    case 'cancelled':
      return 'bg-rose-50 text-rose-700 border border-rose-200';
    default:
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  }
}

function getStatusDot(status) {
  switch (status) {
    case 'paid':
      return 'bg-emerald-500';
    case 'shipped':
      return 'bg-blue-500';
    case 'completed':
      return 'bg-purple-500';
    case 'cancelled':
      return 'bg-rose-500';
    default:
      return 'bg-emerald-500';
  }
}

function updateDashboard() {
  const d = chosenDate.value

  axiosClient.get(`/dashboard/customers-count`, {params: {d}})
    .then(({data}) => { customersCount.value = data; })
    .catch(() => {});

  axiosClient.get(`/dashboard/products-count`, {params: {d}})
    .then(({data}) => { productsCount.value = data; })
    .catch(() => {});

  axiosClient.get(`/dashboard/orders-count`, {params: {d}})
    .then(({data}) => { paidOrders.value = data; })
    .catch(() => {});

  axiosClient.get(`/dashboard/income-amount`, {params: {d}})
    .then(({data}) => {
      totalIncome.value = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(data);
    })
    .catch(() => {});

  axiosClient.get(`/dashboard/latest-customers`, {params: {d}})
    .then(({data: customers}) => { latestCustomers.value = customers; })
    .catch(() => {});

  axiosClient.get(`/dashboard/latest-orders`, {params: {d}})
    .then(({data: orders}) => { latestOrders.value = orders.data || orders; })
    .catch(() => {});
}

function onDatePickerChange() {
  updateDashboard()
}

onMounted(() => {
  updateDashboard()
})
</script>

<style scoped>
</style>
