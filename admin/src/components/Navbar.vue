<template>
  <header class="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
    <!-- Left: Hamburger toggle & Quick Search -->
    <div class="flex items-center gap-3 sm:gap-4 flex-1">
      <button @click="$emit('toggle-sidebar')"
              class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
        <Bars3BottomLeftIcon class="w-6 h-6"/>
      </button>

      <!-- Global Search Mock -->
      <div class="hidden sm:flex items-center relative max-w-xs w-full">
        <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none"/>
        <input type="text"
               placeholder="Search products, orders, customers..."
               class="w-full bg-slate-100/80 border-0 rounded-xl pl-9 pr-10 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"/>
        <kbd class="hidden md:inline-block absolute right-2.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-xs">⌘K</kbd>
      </div>
    </div>

    <!-- Right: Quick Status & User Profile -->
    <div class="flex items-center gap-3">
      <!-- Store Status Pill -->
      <div class="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-semibold">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Store Live
      </div>

      <!-- Notifications Dropdown Mock -->
      <button class="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
        <BellIcon class="w-5 h-5"/>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
      </button>

      <!-- User Profile Menu -->
      <Menu as="div" class="relative inline-block text-left">
        <MenuButton class="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            NM
          </div>
          <div class="hidden md:flex flex-col text-left">
            <span class="text-xs font-semibold text-slate-800 leading-tight">{{ currentUser.name || 'Navid Mirtorabi' }}</span>
            <span class="text-[10px] text-slate-400 leading-tight">Admin</span>
          </div>
          <ChevronDownIcon class="h-4 w-4 text-slate-400" aria-hidden="true"/>
        </MenuButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems class="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-slate-100 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none z-50 p-1">
            <div class="px-3 py-2">
              <p class="text-xs font-semibold text-slate-800">{{ currentUser.name || 'Navid Mirtorabi' }}</p>
              <p class="text-[11px] text-slate-400 truncate">{{ currentUser.email || 'navidm632@gmail.com' }}</p>
            </div>
            <div class="p-1">
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'app.dashboard'}"
                             :class="[active ? 'bg-slate-100 text-indigo-600' : 'text-slate-700', 'flex items-center gap-2 w-full px-2.5 py-1.5 text-xs rounded-xl transition-colors']">
                  <UserCircleIcon class="w-4 h-4"/>
                  My Profile
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{name: 'reports.orders'}"
                             :class="[active ? 'bg-slate-100 text-indigo-600' : 'text-slate-700', 'flex items-center gap-2 w-full px-2.5 py-1.5 text-xs rounded-xl transition-colors']">
                  <ChartBarIcon class="w-4 h-4"/>
                  Store Analytics
                </router-link>
              </MenuItem>
            </div>
            <div class="p-1">
              <MenuItem v-slot="{ active }">
                <button @click="logout"
                        :class="[active ? 'bg-rose-50 text-rose-600' : 'text-slate-700', 'flex items-center gap-2 w-full px-2.5 py-1.5 text-xs rounded-xl transition-colors']">
                  <ArrowLeftOnRectangleIcon class="w-4 h-4"/>
                  Sign out
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </header>
</template>

<script setup>
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline'
import {ChevronDownIcon} from '@heroicons/vue/20/solid'
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue'
import store from "../store";
import router from "../router";
import {computed} from "vue";

defineProps({
  sidebarOpened: Boolean
})

defineEmits(['toggle-sidebar'])

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
