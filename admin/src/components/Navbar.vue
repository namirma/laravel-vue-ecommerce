<template>
  <header class="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
    <!-- Left: Hamburger toggle -->
    <div class="flex items-center gap-3 sm:gap-4 flex-1">
      <button @click="$emit('toggle-sidebar')" aria-label="Toggle sidebar"
              class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
        <Bars3BottomLeftIcon class="w-6 h-6"/>
      </button>
      <span v-if="isDemoMode" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-xs font-semibold">
        Demo mode
      </span>
    </div>

    <!-- Right: User Profile -->
    <div class="flex items-center gap-3">
      <!-- User Profile Menu -->
      <Menu as="div" class="relative inline-block text-left">
        <MenuButton class="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {{ userInitials }}
          </div>
          <div class="hidden md:flex flex-col text-left">
            <span class="text-xs font-semibold text-slate-800 leading-tight">{{ currentUser?.name || 'Admin' }}</span>
            <span class="text-[10px] text-slate-400 leading-tight">{{ currentUser?.role || 'Admin' }}</span>
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
              <p class="text-xs font-semibold text-slate-800">{{ currentUser?.name || 'Admin' }}</p>
              <p v-if="currentUser?.email" class="text-[11px] text-slate-400 truncate">{{ currentUser.email }}</p>
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
  UserCircleIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline'
import {ChevronDownIcon} from '@heroicons/vue/20/solid'
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue'
import store from "../store";
import router from "../router";
import {computed} from "vue";
import { isDemoMode } from "../config";

defineProps({
  sidebarOpened: Boolean
})

defineEmits(['toggle-sidebar'])

const currentUser = computed(() => store.state.user.data);
const userInitials = computed(() => {
  const name = (currentUser.value?.name || 'Admin').trim();
  const parts = name.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || 'A') + (parts[1]?.[0] || '');
});

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
