<template>
  <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
    <!-- Top Filter Bar -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100">
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <span class="text-xs font-semibold text-slate-500 whitespace-nowrap">Show</span>
        <select @change="getUsers(null)" v-model="perPage"
                class="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
        <span class="text-xs text-slate-400 font-medium">({{ users.total || users.data.length }} administrators)</span>
      </div>

      <div class="w-full sm:w-64">
        <input v-model="search" @input="getUsers(null)"
               class="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 placeholder-slate-400 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
               placeholder="Search administrators...">
      </div>
    </div>

    <!-- Users Table -->
    <div class="overflow-x-auto mt-4">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
        <tr>
          <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection" @click="sortUsers('id')" class="py-3 px-4">
            ID
          </TableHeaderCell>
          <TableHeaderCell field="name" :sort-field="sortField" :sort-direction="sortDirection" @click="sortUsers('name')" class="py-3 px-4">
            Admin User
          </TableHeaderCell>
          <TableHeaderCell field="email" :sort-field="sortField" :sort-direction="sortDirection" @click="sortUsers('email')" class="py-3 px-4">
            Email
          </TableHeaderCell>
          <TableHeaderCell field="role" class="py-3 px-4">
            Role
          </TableHeaderCell>
          <TableHeaderCell field="created_at" :sort-field="sortField" :sort-direction="sortDirection" @click="sortUsers('created_at')" class="py-3 px-4">
            Registered
          </TableHeaderCell>
          <TableHeaderCell field="actions" class="py-3 px-4 text-right">
            Actions
          </TableHeaderCell>
        </tr>
        </thead>
        <tbody v-if="users.loading">
        <tr>
          <td colspan="6" class="py-12 text-center">
            <Spinner text="Loading administrators..."/>
          </td>
        </tr>
        </tbody>
        <tbody v-else-if="!users.data || !users.data.length">
        <tr>
          <td colspan="6" class="py-12 text-center text-slate-400 text-xs font-medium">
            No administrator accounts found.
          </td>
        </tr>
        </tbody>
        <tbody v-else class="divide-y divide-slate-100 text-slate-700">
        <tr v-for="user of users.data" :key="user.id" class="hover:bg-slate-50/80 transition-colors">
          <td class="py-3 px-4 font-bold text-slate-500">#{{ user.id }}</td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {{ user.name ? user.name[0] : 'U' }}
              </div>
              <span class="font-bold text-slate-900">{{ user.name }}</span>
            </div>
          </td>
          <td class="py-3 px-4 text-slate-600">{{ user.email }}</td>
          <td class="py-3 px-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              {{ user.role || 'Super Admin' }}
            </span>
          </td>
          <td class="py-3 px-4 text-slate-400">{{ user.created_at }}</td>
          <td class="py-3 px-4 text-right">
            <div class="flex items-center justify-end gap-1">
              <button @click="editUser(user)"
                      class="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title="Edit Administrator">
                <PencilSquareIcon class="w-4 h-4"/>
              </button>
              <button @click="deleteUser(user)"
                      class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Administrator">
                <TrashIcon class="w-4 h-4"/>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div class="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
      <span>Showing 1 to {{ users.data.length }} of {{ users.total || users.data.length }} administrators</span>
      <div class="flex items-center gap-1">
        <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
        <button class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold">1</button>
        <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import Spinner from "../../components/core/Spinner.vue";
import TableHeaderCell from "../../components/core/Table/TableHeaderCell.vue";
import {PencilSquareIcon, TrashIcon} from "@heroicons/vue/24/outline";

const perPage = ref(10);
const search = ref('');
const users = computed(() => store.state.users);
const sortField = ref('created_at');
const sortDirection = ref('desc');

const emit = defineEmits(['clickEdit']);

onMounted(() => {
  getUsers();
});

function getUsers(url = null) {
  store.dispatch("getUsers", {
    url,
    search: search.value,
    per_page: perPage.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  });
}

function sortUsers(field) {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
  getUsers();
}

function deleteUser(user) {
  if (!confirm(`Are you sure you want to delete administrator "${user.name}"?`)) {
    return;
  }
  store.dispatch('deleteUser', user.id)
    .then(() => {
      getUsers();
    });
}

function editUser(u) {
  emit('clickEdit', u);
}
</script>

<style scoped>
</style>
