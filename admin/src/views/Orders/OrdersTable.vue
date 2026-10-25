<template>
  <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
    <!-- Top Filter Bar -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100">
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <span class="text-xs font-semibold text-slate-500 whitespace-nowrap">Show</span>
        <select @change="getOrders(null)" v-model="perPage"
                class="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
        <span class="text-xs text-slate-400 font-medium">({{ orders.total || orders.data.length }} orders)</span>
      </div>

      <div class="w-full sm:w-64">
        <input v-model="search" @input="getOrders(null)"
               class="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 placeholder-slate-400 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
               placeholder="Search by ID or customer...">
      </div>
    </div>

    <!-- Orders Table -->
    <div class="overflow-x-auto mt-4">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
        <tr>
          <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection" @click="sortOrders('id')" class="py-3 px-4">
            Order #
          </TableHeaderCell>
          <TableHeaderCell field="customer" class="py-3 px-4">
            Customer
          </TableHeaderCell>
          <TableHeaderCell field="status" :sort-field="sortField" :sort-direction="sortDirection" @click="sortOrders('status')" class="py-3 px-4">
            Status
          </TableHeaderCell>
          <TableHeaderCell field="total_price" :sort-field="sortField" :sort-direction="sortDirection" @click="sortOrders('total_price')" class="py-3 px-4">
            Total Price
          </TableHeaderCell>
          <TableHeaderCell field="created_at" :sort-field="sortField" :sort-direction="sortDirection" @click="sortOrders('created_at')" class="py-3 px-4">
            Order Date
          </TableHeaderCell>
          <TableHeaderCell field="actions" class="py-3 px-4 text-right">
            Actions
          </TableHeaderCell>
        </tr>
        </thead>
        <tbody v-if="orders.loading">
        <tr>
          <td colspan="6" class="py-12 text-center">
            <Spinner text="Loading orders..."/>
          </td>
        </tr>
        </tbody>
        <tbody v-else-if="!orders.data || !orders.data.length">
        <tr>
          <td colspan="6" class="py-12 text-center text-slate-400 text-xs font-medium">
            No orders found matching your search.
          </td>
        </tr>
        </tbody>
        <tbody v-else class="divide-y divide-slate-100 text-slate-700">
        <tr v-for="order of orders.data" :key="order.id" class="hover:bg-slate-50/80 transition-colors">
          <td class="py-3 px-4 font-bold text-indigo-600">
            <router-link :to="{name: 'app.orders.view', params: {id: order.id}}" class="hover:underline">
              #{{ order.id }}
            </router-link>
          </td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                {{ order.customer?.first_name ? order.customer.first_name[0] : (order.first_name ? order.first_name[0] : 'C') }}
              </div>
              <span class="font-medium text-slate-900">
                {{ order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : `${order.first_name || ''} ${order.last_name || ''}` }}
              </span>
            </div>
          </td>
          <td class="py-3 px-4">
            <OrderStatus :order="order"/>
          </td>
          <td class="py-3 px-4 font-extrabold text-slate-900">
            {{ $filters.currencyUSD(order.total_price) }}
          </td>
          <td class="py-3 px-4 text-slate-400">
            {{ order.created_at }}
          </td>
          <td class="py-3 px-4 text-right">
            <router-link :to="{name: 'app.orders.view', params: {id: order.id}}"
                         class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-medium transition-colors">
              View
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div class="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
      <span>Showing 1 to {{ orders.data.length }} of {{ orders.total || orders.data.length }} orders</span>
      <div class="flex items-center gap-1">
        <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
        <button class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold">1</button>
        <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import Spinner from "../../components/core/Spinner.vue";
import TableHeaderCell from "../../components/core/Table/TableHeaderCell.vue";
import OrderStatus from "./OrderStatus.vue";

const perPage = ref(10);
const search = ref('');
const orders = computed(() => store.state.orders);
const sortField = ref('updated_at');
const sortDirection = ref('desc');

onMounted(() => {
  getOrders();
})

function getOrders(url = null) {
  store.dispatch("getOrders", {
    url,
    search: search.value,
    per_page: perPage.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  });
}

function sortOrders(field) {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
  getOrders()
}
</script>

<style scoped>
</style>
