<template>
  <div class="space-y-6">
    <!-- Orders Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          Customer Orders <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Transactions</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor order fulfillment, payment confirmations, shipment statuses, and invoice details.
        </p>
      </div>
    </div>

    <!-- Main Orders Table -->
    <OrdersTable />
  </div>
</template>

<script setup>
import {computed} from "vue";
import store from "../../store";
import OrdersTable from "./OrdersTable.vue";

const orders = computed(() => store.state.orders);
</script>

<style scoped>
</style>
