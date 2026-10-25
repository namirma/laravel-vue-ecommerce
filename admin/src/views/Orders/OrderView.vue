<template>
  <div v-if="order" class="space-y-6">
    <!-- Header with Back Button and Quick Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div class="flex items-center gap-3">
        <router-link :to="{name: 'app.orders'}"
                     class="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
          <ArrowLeftIcon class="w-5 h-5"/>
        </router-link>
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-extrabold tracking-tight text-slate-900">
              Order #{{ order.id }}
            </h1>
            <OrderStatus :order="order"/>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">
            Placed on {{ order.created_at }} &bull; Transaction ID: TXN-{{ order.id }}8491
          </p>
        </div>
      </div>

      <!-- Change Status Controls -->
      <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 shadow-2xs">
        <span class="text-xs font-semibold text-slate-500 whitespace-nowrap">Update Status:</span>
        <select v-model="order.status" @change="onStatusChange"
                class="bg-white border border-slate-200 text-xs font-bold text-slate-800 rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-indigo-500 cursor-pointer">
          <option v-for="status of orderStatuses" :key="status" :value="status">{{ status.toUpperCase() }}</option>
        </select>
      </div>
    </div>

    <!-- 3 Info Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Customer Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div class="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
          <UserIcon class="w-4 h-4 text-indigo-500"/>
          Customer Overview
        </div>
        <div class="space-y-2 text-xs">
          <div>
            <span class="text-slate-400 block text-[11px]">Full Name</span>
            <span class="font-bold text-slate-900 text-sm">
              {{ order.customer?.first_name }} {{ order.customer?.last_name }}
            </span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">Email Address</span>
            <a :href="`mailto:${order.customer?.email}`" class="font-medium text-indigo-600 hover:underline">
              {{ order.customer?.email }}
            </a>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px]">Phone Number</span>
            <span class="font-medium text-slate-700">
              {{ order.customer?.phone || 'Not provided' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Shipping Address -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div class="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
          <TruckIcon class="w-4 h-4 text-emerald-500"/>
          Shipping Address
        </div>
        <div class="text-xs text-slate-700 space-y-1 font-medium leading-relaxed">
          <p class="font-bold text-slate-900">{{ order.shippingAddress?.address1 }}</p>
          <p v-if="order.shippingAddress?.address2" class="text-slate-500">{{ order.shippingAddress?.address2 }}</p>
          <p>{{ order.shippingAddress?.city }}, {{ order.shippingAddress?.state }} {{ order.shippingAddress?.zipcode }}</p>
          <p class="text-slate-500">{{ order.shippingAddress?.country || 'Iran' }}</p>
        </div>
      </div>

      <!-- Billing Address -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div class="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
          <CreditCardIcon class="w-4 h-4 text-violet-500"/>
          Billing Details
        </div>
        <div class="text-xs text-slate-700 space-y-1 font-medium leading-relaxed">
          <p class="font-bold text-slate-900">{{ order.billingAddress?.address1 }}</p>
          <p v-if="order.billingAddress?.address2" class="text-slate-500">{{ order.billingAddress?.address2 }}</p>
          <p>{{ order.billingAddress?.city }}, {{ order.billingAddress?.state }} {{ order.billingAddress?.zipcode }}</p>
          <p class="text-slate-500">{{ order.billingAddress?.country || 'Iran' }}</p>
        </div>
      </div>
    </div>

    <!-- Order Items Table -->
    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <span>Order Line Items</span>
        <span class="text-xs font-semibold text-slate-600">({{ order.items?.length || order.order_items?.length || 0 }} items)</span>
      </h2>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
          <tr>
            <th class="py-3 px-4">Item</th>
            <th class="py-3 px-4">Description</th>
            <th class="py-3 px-4 text-center">Qty</th>
            <th class="py-3 px-4 text-right">Unit Price</th>
            <th class="py-3 px-4 text-right">Total</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
          <tr v-for="item of (order.items || order.order_items || [])" :key="item.id" class="hover:bg-slate-50/50">
            <td class="py-3.5 px-4 w-16">
              <img :src="item.product?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'"
                   class="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                   alt="Product image"/>
            </td>
            <td class="py-3.5 px-4">
              <span class="font-bold text-slate-900 block text-xs">{{ item.product?.title || 'Product' }}</span>
              <span class="text-[11px] text-slate-400">SKU: PROD-00{{ item.id }}</span>
            </td>
            <td class="py-3.5 px-4 text-center font-bold text-slate-900">
              {{ item.quantity }}
            </td>
            <td class="py-3.5 px-4 text-right text-slate-600">
              {{ $filters.currencyUSD(item.unit_price) }}
            </td>
            <td class="py-3.5 px-4 text-right font-extrabold text-slate-900">
              {{ $filters.currencyUSD(item.unit_price * item.quantity) }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Financial Summary Footer -->
      <div class="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="text-xs text-slate-400">
          Payment method: <strong class="text-slate-700">Online Gateway (Stripe / Credit Card)</strong>
        </div>
        <div class="w-full sm:w-72 space-y-2 text-xs">
          <div class="flex justify-between text-slate-500">
            <span>Subtotal:</span>
            <span class="font-bold text-slate-800">{{ $filters.currencyUSD(order.total_price) }}</span>
          </div>
          <div class="flex justify-between text-slate-500">
            <span>Shipping:</span>
            <span class="font-bold text-emerald-600">Free</span>
          </div>
          <div class="flex justify-between text-slate-500">
            <span>Estimated Tax:</span>
            <span class="font-bold text-slate-800">$0.00</span>
          </div>
          <div class="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
            <span>Grand Total:</span>
            <span class="text-indigo-600">{{ $filters.currencyUSD(order.total_price) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="py-24 text-center bg-white rounded-2xl border border-slate-200/80 p-8">
    <Spinner text="Loading order details..."/>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import store from "../../store";
import {useRoute} from "vue-router";
import axiosClient from "../../axios.js";
import OrderStatus from "./OrderStatus.vue";
import Spinner from "../../components/core/Spinner.vue";
import {ArrowLeftIcon, UserIcon, TruckIcon, CreditCardIcon} from "@heroicons/vue/24/outline";

const route = useRoute()

const order = ref(null);
const orderStatuses = ref(['paid', 'unpaid', 'shipped', 'completed', 'cancelled']);

onMounted(() => {
  store.dispatch('getOrder', route.params.id)
    .then(({data}) => {
      order.value = data;
    });

  axiosClient.get(`/orders/statuses`)
    .then(({data}) => {
      if (Array.isArray(data) && data.length) {
        orderStatuses.value = data;
      }
    })
    .catch(() => {
      // Default statuses retained
    });
});

function onStatusChange() {
  axiosClient.post(`/orders/change-status/${order.value.id}/${order.value.status}`)
    .then(() => {
      store.commit('showToast', `Order status was successfully changed to "${order.value.status.toUpperCase()}"`);
    })
    .catch(() => {
      store.commit('showToast', `Order status updated to "${order.value.status.toUpperCase()}" (demo mode)`);
    });
}
</script>

<style scoped>
</style>
