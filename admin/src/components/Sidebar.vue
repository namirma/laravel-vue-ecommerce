<template>
  <div class="min-w-[180px] w-[180px] transition-all bg-indigo-700 text-white py-4 px-3 flex flex-col gap-1 shadow-lg">
    <router-link :to="{name: 'app.dashboard'}"
                 active-class="bg-black/30 font-semibold text-white"
                 class="flex items-center p-2.5 rounded-lg transition-colors hover:bg-black/20 text-indigo-100">
      <span class="mr-3 text-indigo-200">
        <HomeIcon class="w-5 h-5"/>
      </span>
      <span class="text-sm">
        Dashboard
      </span>
    </router-link>
    <router-link :to="{name: 'app.products'}"
                 active-class="bg-black/30 font-semibold text-white"
                 class="flex items-center p-2.5 rounded-lg transition-colors hover:bg-black/20 text-indigo-100">
      <span class="mr-3 text-indigo-200">
        <QueueListIcon class="w-5 h-5"/>
      </span>
      <span class="text-sm">
        Products
      </span>
    </router-link>
    <router-link :to="{name: 'app.orders'}"
                 active-class="bg-black/30 font-semibold text-white"
                 class="flex items-center p-2.5 rounded-lg transition-colors hover:bg-black/20 text-indigo-100">
      <span class="mr-3 text-indigo-200">
        <ShoppingBagIcon class="w-5 h-5"/>
      </span>
      <span class="text-sm">
        Orders
      </span>
    </router-link>
    <router-link :to="{name: 'app.customers'}"
                 active-class="bg-black/30 font-semibold text-white"
                 class="flex items-center p-2.5 rounded-lg transition-colors hover:bg-black/20 text-indigo-100">
      <span class="mr-3 text-indigo-200">
        <UserGroupIcon class="w-5 h-5"/>
      </span>
      <span class="text-sm">
        Customers
      </span>
    </router-link>
    <router-link :to="{name: 'app.users'}"
                 active-class="bg-black/30 font-semibold text-white"
                 class="flex items-center p-2.5 rounded-lg transition-colors hover:bg-black/20 text-indigo-100">
      <span class="mr-3 text-indigo-200">
        <UsersIcon class="w-5 h-5"/>
      </span>
      <span class="text-sm">
        Users
      </span>
    </router-link>
    <router-link :to="{name: 'reports.orders'}"
                 active-class="bg-black/30 font-semibold text-white"
                 class="flex items-center p-2.5 rounded-lg transition-colors hover:bg-black/20 text-indigo-100">
      <span class="mr-3 text-indigo-200">
        <ChartBarIcon class="w-5 h-5"/>
      </span>
      <span class="text-sm">
        Reports
      </span>
    </router-link>
  </div>
</template>

<script setup>
  import {HomeIcon, UserGroupIcon, UsersIcon, QueueListIcon, ShoppingBagIcon, ChartBarIcon} from '@heroicons/vue/24/outline'
</script>

<style scoped>
</style>
