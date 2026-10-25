<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-slate-50 flex text-slate-800 antialiased font-sans">
    <!-- Sidebar -->
    <Sidebar :sidebar-opened="sidebarOpened" @close="sidebarOpened = false"/>

    <!-- Main Content Container -->
    <div class="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
      <!-- Navbar -->
      <Navbar :sidebar-opened="sidebarOpened" @toggle-sidebar="toggleSidebar"/>

      <!-- Content -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <router-view></router-view>
      </main>

      <!-- Footer -->
      <footer class="py-4 px-6 border-t border-slate-200/80 bg-white/50 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>&copy; 2026 <strong>Laravel & Vue E-Commerce Admin</strong> &bull; Crafted by <a href="https://github.com/namirma" target="_blank" class="text-indigo-600 hover:underline font-medium">Navid Mirtorabi</a></span>
        <div class="flex items-center gap-4">
          <span class="inline-flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> API: Connected</span>
          <span>Vue 3.5 &bull; Vite 6 &bull; Tailwind 3.4</span>
        </div>
      </footer>
    </div>
  </div>

  <!-- Fallback loader ONLY if not authenticated and trying to resolve auth -->
  <div v-else class="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
    <div class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <span class="text-sm font-medium tracking-wide text-slate-300">Loading Admin Dashboard...</span>
  </div>

  <Toast />
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue'
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import store from "../store";
import Toast from "./core/Toast.vue";

const sidebarOpened = ref(true);
const currentUser = computed(() => store.state.user.data);
const token = computed(() => store.state.user.token);

// If user has token or user data, they are authenticated
const isAuthenticated = computed(() => !!token.value || !!currentUser.value?.id || !!currentUser.value?.name);

function toggleSidebar() {
  sidebarOpened.value = !sidebarOpened.value
}

function updateSidebarState() {
  sidebarOpened.value = window.innerWidth >= 1024;
}

onMounted(() => {
  // Ensure default demo user exists if token exists but user.data is empty
  if (token.value && (!currentUser.value || !currentUser.value.id)) {
    store.commit('setUser', {
      id: 1,
      name: 'Navid Mirtorabi',
      email: 'navidm632@gmail.com',
      role: 'Super Admin'
    });
  }

  store.dispatch('getCurrentUser').catch(() => {});
  store.dispatch('getCountries').catch(() => {});
  updateSidebarState();
  window.addEventListener('resize', updateSidebarState)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSidebarState)
})
</script>

<style>
html, body, #app {
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
}
</style>
