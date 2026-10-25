<template>
  <div class="space-y-6">
    <!-- Reports Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          Business Reports & Analytics <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Reports</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Historical growth trajectories, orders fulfillment rate, and customer acquisition volume.
        </p>
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- Date Filter -->
        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs">
          <CalendarIcon class="w-4 h-4 text-slate-400"/>
          <select v-model="chosenDate"
                  @change="onDatePickerChange"
                  class="bg-transparent border-0 p-0 text-xs font-semibold text-slate-700 focus:ring-0 cursor-pointer">
            <option v-for="opt of dateOptions" :key="opt.key" :value="opt.key">{{ opt.text }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Sub-navigation Tabs -->
    <div class="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs inline-flex gap-2">
      <router-link :to="{name: 'reports.orders', params: route.params}"
                   class="px-4 py-2 text-xs font-bold rounded-xl transition-all"
                   :class="route.name === 'reports.orders' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'">
        Orders Fulfillment Chart
      </router-link>
      <router-link :to="{name: 'reports.customers', params: route.params}"
                   class="px-4 py-2 text-xs font-bold rounded-xl transition-all"
                   :class="route.name === 'reports.customers' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'">
        Customer Growth Chart
      </router-link>
    </div>

    <!-- Active Chart Container -->
    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {CalendarIcon} from "@heroicons/vue/24/outline";

const store = useStore();
const router = useRouter();
const route = useRoute();
const dateOptions = computed(() => store.state.dateOptions || [
  {key: '1d', text: 'Today'},
  {key: '1k', text: 'Last 7 Days'},
  {key: '2k', text: 'Last 14 Days'},
  {key: '1m', text: 'Last 30 Days'},
  {key: 'all', text: 'All Time'}
]);
const chosenDate = ref('all');

function onDatePickerChange() {
  router.push({name: route.name, params: {date: chosenDate.value}});
}
</script>

<style scoped>
</style>
