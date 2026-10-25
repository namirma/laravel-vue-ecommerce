<template>
  <div class="space-y-6">
    <!-- Customers Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          Customers Directory <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">CRM</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          View registered customer accounts, lifetime order history, contact details, and shipping records.
        </p>
      </div>
    </div>

    <!-- Main Customers Table -->
    <CustomersTable />
  </div>
</template>

<script setup>
import {computed} from "vue";
import store from "../../store";
import CustomersTable from "./CustomersTable.vue";

const customers = computed(() => store.state.customers);
</script>

<style scoped>
</style>
