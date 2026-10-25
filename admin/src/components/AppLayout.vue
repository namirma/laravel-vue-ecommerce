<template>
    <div class="h-full bg-gray-200 flex">
      <!-- Sidebar -->
      <Sidebar/>
      <!-- Main Content Area -->
      <div class="flex-1 ">
        <Navbar></Navbar>
        <!-- Content -->
        <main class="p-6">
            <div class = 'p-4 rounded-none bg-white'>
          <router-view></router-view>
        </div>
        </main>
      </div>
    </div>
  </template>

  <script setup>
  import Sidebar from './Sidebar.vue';
  import Navbar from './Navbar.vue';
  const name = "AppLayout";
  </script>

  <style scoped></style>
