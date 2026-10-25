<template>
  <div class="space-y-6">
    <!-- Users Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          Administrator Accounts <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">Team</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Manage system administrators, store staff roles, credentials, and access permissions.
        </p>
      </div>

      <div>
        <button type="button"
                @click="showAddNewModal()"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition-all cursor-pointer">
          <PlusIcon class="w-4 h-4"/>
          Add New Administrator
        </button>
      </div>
    </div>

    <!-- Main Users Table -->
    <UsersTable @clickEdit="editUser"/>

    <!-- User Modal -->
    <UserModal v-model="showUserModal" :user="userModel" @close="onModalClose"/>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import store from "../../store";
import UserModal from "./UserModal.vue";
import UsersTable from "./UsersTable.vue";
import {PlusIcon} from "@heroicons/vue/24/outline";

const DEFAULT_USER = {
  id: '',
  name: '',
  email: '',
  password: ''
};

const users = computed(() => store.state.users);
const userModel = ref({...DEFAULT_USER});
const showUserModal = ref(false);

function showAddNewModal() {
  userModel.value = {...DEFAULT_USER};
  showUserModal.value = true;
}

function editUser(u) {
  userModel.value = {...u};
  showAddNewModal();
}

function onModalClose() {
  userModel.value = {...DEFAULT_USER};
}
</script>

<style scoped>
</style>
