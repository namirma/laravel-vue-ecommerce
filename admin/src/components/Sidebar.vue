<template>
  <!-- Backdrop for mobile -->
  <div v-if="sidebarOpened"
       @click="$emit('close')"
       class="fixed inset-0 bg-slate-900/60 z-30 lg:hidden backdrop-blur-xs transition-opacity"></div>

  <!-- Sidebar Container -->
  <aside :class="[
    'fixed lg:sticky top-0 h-screen z-40 flex flex-col justify-between bg-slate-900 text-slate-300 w-64 border-r border-slate-800/80 transition-all duration-300 ease-in-out shrink-0 select-none',
    sidebarOpened ? 'translate-x-0' : '-translate-x-full lg:w-20'
  ]">
    <!-- Top Brand & Header -->
    <div>
      <div class="h-16 flex items-center px-5 border-b border-slate-800/80 gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
          <ShoppingBagIcon class="w-6 h-6"/>
        </div>
        <div v-if="sidebarOpened" class="flex flex-col min-w-0 transition-opacity">
          <span class="text-sm font-bold tracking-tight text-white truncate">E-COMMERCE</span>
          <span class="text-[10px] font-semibold text-indigo-400 tracking-widest uppercase">Admin Suite v3.5</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
        <!-- Group 1: Core -->
        <div>
          <span v-if="sidebarOpened" class="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-500">Overview</span>
          <div class="mt-2 space-y-1">
            <router-link :to="{name: 'app.dashboard'}"
                         class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                         :class="$route.name === 'app.dashboard'
                           ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                           : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'">
              <HomeIcon class="w-5 h-5 shrink-0 transition-colors"
                        :class="$route.name === 'app.dashboard' ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'"/>
              <span v-if="sidebarOpened" class="truncate">Dashboard</span>
            </router-link>

            <router-link :to="{name: 'reports.orders'}"
                         class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                         :class="$route.path.startsWith('/report')
                           ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                           : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'">
              <ChartBarIcon class="w-5 h-5 shrink-0 transition-colors"
                            :class="$route.path.startsWith('/report') ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'"/>
              <span v-if="sidebarOpened" class="truncate">Reports & Analytics</span>
            </router-link>
          </div>
        </div>

        <!-- Group 2: Commerce -->
        <div>
          <span v-if="sidebarOpened" class="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-500">Store Management</span>
          <div class="mt-2 space-y-1">
            <router-link :to="{name: 'app.products'}"
                         class="group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                         :class="$route.name === 'app.products'
                           ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                           : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'">
              <div class="flex items-center gap-3 min-w-0">
                <CubeIcon class="w-5 h-5 shrink-0 transition-colors"
                          :class="$route.name === 'app.products' ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'"/>
                <span v-if="sidebarOpened" class="truncate">Products</span>
              </div>
              <span v-if="sidebarOpened" class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 group-hover:bg-slate-700">96</span>
            </router-link>

            <router-link :to="{name: 'app.orders'}"
                         class="group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                         :class="$route.name === 'app.orders' || $route.name === 'app.orders.view'
                           ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                           : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'">
              <div class="flex items-center gap-3 min-w-0">
                <ClipboardDocumentListIcon class="w-5 h-5 shrink-0 transition-colors"
                                           :class="$route.name === 'app.orders' ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'"/>
                <span v-if="sidebarOpened" class="truncate">Orders</span>
              </div>
              <span v-if="sidebarOpened" class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">342</span>
            </router-link>
          </div>
        </div>

        <!-- Group 3: Users -->
        <div>
          <span v-if="sidebarOpened" class="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-500">Audience</span>
          <div class="mt-2 space-y-1">
            <router-link :to="{name: 'app.customers'}"
                         class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                         :class="$route.name === 'app.customers' || $route.name === 'app.customers.view'
                           ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                           : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'">
              <UserGroupIcon class="w-5 h-5 shrink-0 transition-colors"
                             :class="$route.name === 'app.customers' ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'"/>
              <span v-if="sidebarOpened" class="truncate">Customers</span>
            </router-link>

            <router-link :to="{name: 'app.users'}"
                         class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                         :class="$route.name === 'app.users'
                           ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                           : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'">
              <UsersIcon class="w-5 h-5 shrink-0 transition-colors"
                         :class="$route.name === 'app.users' ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'"/>
              <span v-if="sidebarOpened" class="truncate">Staff & Roles</span>
            </router-link>
          </div>
        </div>
      </nav>
    </div>

    <!-- Bottom User Status Card -->
    <div class="p-3 border-t border-slate-800/80 bg-slate-950/50">
      <div v-if="sidebarOpened" class="flex items-center justify-between p-2 rounded-xl bg-slate-800/50">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 border border-indigo-500/30">
            NM
          </div>
          <div class="min-w-0 flex flex-col">
            <span class="text-xs font-semibold text-white truncate">{{ currentUser.name || 'Navid Mirtorabi' }}</span>
            <span class="text-[10px] text-emerald-400 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Super Admin
            </span>
          </div>
        </div>
        <button @click="logout" title="Logout" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors">
          <ArrowLeftOnRectangleIcon class="w-5 h-5"/>
        </button>
      </div>

      <div v-else class="flex justify-center">
        <button @click="logout" title="Logout" class="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors">
          <ArrowLeftOnRectangleIcon class="w-5 h-5"/>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import {computed} from "vue";
import {
  HomeIcon,
  ShoppingBagIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline'
import store from "../store";
import router from "../router";

defineProps({
  sidebarOpened: Boolean
})

defineEmits(['close'])

const currentUser = computed(() => store.state.user.data);

function logout() {
  store.dispatch('logout')
    .then(() => {
      router.push({name: 'login'})
    })
    .catch(() => {
      store.commit('setToken', null);
      sessionStorage.removeItem('TOKEN');
      router.push({name: 'login'});
    })
}
</script>

<style scoped>
</style>
