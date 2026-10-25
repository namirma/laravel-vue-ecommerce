<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full p-4 text-center">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative bg-white rounded-2xl text-left overflow-hidden shadow-2xl border border-slate-200/80 transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <Spinner v-if="loading"
                       class="absolute left-0 top-0 bg-white/80 backdrop-blur-xs right-0 bottom-0 z-20 flex items-center justify-center"/>

              <header class="py-4 px-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/60">
                <DialogTitle as="h3" class="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  {{ user.id ? `Edit Administrator: ${props.user.name}` : 'Create New Administrator' }}
                </DialogTitle>
                <button
                  @click="closeModal"
                  class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <XMarkIcon class="h-5 w-5"/>
                </button>
              </header>

              <form @submit.prevent="onSubmit">
                <div class="bg-white p-6 space-y-4">
                  <CustomInput class="mb-1" v-model="user.name" label="Full Name" required placeholder="e.g. Navid Mirtorabi"/>
                  <CustomInput class="mb-1" v-model="user.email" label="Email Address" type="email" required placeholder="admin@domain.com"/>
                  <CustomInput type="password" class="mb-1" v-model="user.password" :label="user.id ? 'Password (leave blank to keep unchanged)' : 'Password'" :required="!user.id" placeholder="••••••••"/>
                </div>

                <footer class="bg-slate-50/80 px-6 py-4 flex flex-row-reverse items-center gap-3 border-t border-slate-100">
                  <button type="submit"
                          :disabled="loading"
                          class="inline-flex justify-center items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50 cursor-pointer">
                    {{ user.id ? 'Save Administrator' : 'Create Administrator' }}
                  </button>
                  <button type="button"
                          class="inline-flex justify-center rounded-xl border border-slate-200 px-4 py-2.5 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none transition-colors cursor-pointer"
                          @click="closeModal">
                    Cancel
                  </button>
                </footer>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {computed, onUpdated, ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {XMarkIcon} from '@heroicons/vue/24/outline'
import CustomInput from "../../components/core/CustomInput.vue";
import store from "../../store/index.js";
import Spinner from "../../components/core/Spinner.vue";

const props = defineProps({
  modelValue: Boolean,
  user: {
    required: true,
    type: Object,
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const user = ref({
  id: props.user.id,
  name: props.user.name,
  email: props.user.email,
  password: ''
})

const loading = ref(false)

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

onUpdated(() => {
  user.value = {
    id: props.user.id,
    name: props.user.name,
    email: props.user.email,
    password: ''
  }
})

function closeModal() {
  show.value = false
  emit('close')
}

function onSubmit() {
  loading.value = true
  if (user.value.id) {
    store.dispatch('updateUser', user.value)
      .then(() => {
        loading.value = false;
        store.dispatch('getUsers')
        closeModal()
      })
      .catch(() => {
        loading.value = false;
        closeModal()
      })
  } else {
    store.dispatch('createUser', user.value)
      .then(() => {
        loading.value = false;
        store.dispatch('getUsers')
        closeModal()
      })
      .catch(() => {
        loading.value = false;
        closeModal()
      })
  }
}
</script>
