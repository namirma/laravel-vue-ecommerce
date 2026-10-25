<template>
  <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
    <!-- Top Filter Bar -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100">
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <span class="text-xs font-semibold text-slate-500 whitespace-nowrap">Show</span>
        <select @change="getCustomers(null)" v-model="perPage"
                class="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
        <span class="text-xs text-slate-400 font-medium">({{ customers.total || customers.data.length }} customers)</span>
      </div>

      <div class="w-full sm:w-64">
        <input v-model="search" @input="getCustomers(null)"
               class="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 placeholder-slate-400 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
               placeholder="Search customers by name...">
      </div>
    </div>

    <!-- Customers Table -->
    <div class="overflow-x-auto mt-4">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
        <tr>
          <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection" @click="sortCustomers('id')" class="py-3 px-4">
            ID
          </TableHeaderCell>
          <TableHeaderCell field="name" :sort-field="sortField" :sort-direction="sortDirection" @click="sortCustomers('name')" class="py-3 px-4">
            Customer Name
          </TableHeaderCell>
          <TableHeaderCell field="email" :sort-field="sortField" :sort-direction="sortDirection" @click="sortCustomers('email')" class="py-3 px-4">
            Email
          </TableHeaderCell>
          <TableHeaderCell field="phone" :sort-field="sortField" :sort-direction="sortDirection" @click="sortCustomers('phone')" class="py-3 px-4">
            Phone
          </TableHeaderCell>
          <TableHeaderCell field="status" :sort-field="sortField" :sort-direction="sortDirection" @click="sortCustomers('status')" class="py-3 px-4">
            Status
          </TableHeaderCell>
          <TableHeaderCell field="date" :sort-field="sortField" :sort-direction="sortDirection" @click="sortCustomers('created_at')" class="py-3 px-4">
            Member Since
          </TableHeaderCell>
          <TableHeaderCell field="actions" class="py-3 px-4 text-right">
            Actions
          </TableHeaderCell>
        </tr>
        </thead>
        <tbody v-if="customers.loading">
        <tr>
          <td colspan="7" class="py-12 text-center">
            <Spinner text="Loading customers..."/>
          </td>
        </tr>
        </tbody>
        <tbody v-else-if="!customers.data || !customers.data.length">
        <tr>
          <td colspan="7" class="py-12 text-center text-slate-400 text-xs font-medium">
            No customers found.
          </td>
        </tr>
        </tbody>
        <tbody v-else class="divide-y divide-slate-100 text-slate-700">
        <tr v-for="customer of customers.data" :key="customer.id" class="hover:bg-slate-50/80 transition-colors">
          <td class="py-3 px-4 font-bold text-slate-500">#{{ customer.id }}</td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs">
                {{ (customer.first_name ? customer.first_name[0] : 'C') + (customer.last_name ? customer.last_name[0] : '') }}
              </div>
              <router-link :to="{name: 'app.customers.view', params: {id: customer.id}}"
                           class="font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                {{ customer.first_name }} {{ customer.last_name }}
              </router-link>
            </div>
          </td>
          <td class="py-3 px-4 text-slate-600">{{ customer.email }}</td>
          <td class="py-3 px-4 text-slate-500">{{ customer.phone || '—' }}</td>
          <td class="py-3 px-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Active
            </span>
          </td>
          <td class="py-3 px-4 text-slate-400">{{ customer.created_at }}</td>
          <td class="py-3 px-4 text-right">
            <router-link :to="{name: 'app.customers.view', params: {id: customer.id}}"
                         class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-medium transition-colors">
              Details
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import Spinner from "../../components/core/Spinner.vue";
import TableHeaderCell from "../../components/core/Table/TableHeaderCell.vue";

const perPage = ref(10);
const search = ref('');
const customers = computed(() => store.state.customers);
const sortField = ref('created_at');
const sortDirection = ref('desc');

onMounted(() => {
  getCustomers();
})

function getCustomers(url = null) {
  store.dispatch("getCustomers", {
    url,
    search: search.value,
    per_page: perPage.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  });
}

function sortCustomers(field) {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
  getCustomers()
}
</script>

<style scoped>
</style>
