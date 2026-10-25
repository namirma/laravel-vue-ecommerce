<template>
  <div v-if="customer.id" class="space-y-6">
    <!-- Header with Back Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div class="flex items-center gap-3">
        <router-link :to="{name: 'app.customers'}"
                     class="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
          <ArrowLeftIcon class="w-5 h-5"/>
        </router-link>
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-extrabold tracking-tight text-slate-900">
              {{ title || 'Customer Profile' }}
            </h1>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {{ customer.status ? 'Active Account' : 'Inactive' }}
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">
            Account ID: #CUST-00{{ customer.id }} &bull; Member since {{ customer.created_at || '2026-08-14' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Customer Details Form -->
    <form @submit.prevent="onSubmit">
      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <UserIcon class="w-4 h-4 text-indigo-500"/>
            General Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput class="mb-1" v-model="customer.first_name" label="First Name" required/>
            <CustomInput class="mb-1" v-model="customer.last_name" label="Last Name" required/>
            <CustomInput class="mb-1" v-model="customer.email" label="Email Address" type="email" required/>
            <CustomInput class="mb-1" v-model="customer.phone" label="Phone Number"/>
          </div>
          <div class="mt-4">
            <CustomInput type="checkbox" v-model="customer.status" label="Account is Active"/>
          </div>
        </div>

        <!-- Addresses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <!-- Billing Address -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 flex items-center gap-2">
              <CreditCardIcon class="w-4 h-4 text-violet-500"/>
              Billing Address
            </h3>
            <CustomInput v-model="customer.billingAddress.address1" label="Street Address 1"/>
            <CustomInput v-model="customer.billingAddress.address2" label="Street Address 2 (Apt / Suite)"/>
            <div class="grid grid-cols-2 gap-3">
              <CustomInput v-model="customer.billingAddress.city" label="City"/>
              <CustomInput v-model="customer.billingAddress.zipcode" label="Zip Code"/>
            </div>
            <CustomInput type="select" :select-options="countries" v-model="customer.billingAddress.country_code" label="Country"/>
            <CustomInput v-if="!billingCountry?.states" v-model="customer.billingAddress.state" label="State / Province"/>
            <CustomInput v-else type="select" :select-options="billingStateOptions" v-model="customer.billingAddress.state" label="State / Province"/>
          </div>

          <!-- Shipping Address -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 flex items-center gap-2">
              <TruckIcon class="w-4 h-4 text-emerald-500"/>
              Shipping Address
            </h3>
            <CustomInput v-model="customer.shippingAddress.address1" label="Street Address 1"/>
            <CustomInput v-model="customer.shippingAddress.address2" label="Street Address 2 (Apt / Suite)"/>
            <div class="grid grid-cols-2 gap-3">
              <CustomInput v-model="customer.shippingAddress.city" label="City"/>
              <CustomInput v-model="customer.shippingAddress.zipcode" label="Zip Code"/>
            </div>
            <CustomInput type="select" :select-options="countries" v-model="customer.shippingAddress.country_code" label="Country"/>
            <CustomInput v-if="!shippingCountry?.states" v-model="customer.shippingAddress.state" label="State / Province"/>
            <CustomInput v-else type="select" :select-options="shippingStateOptions" v-model="customer.shippingAddress.state" label="State / Province"/>
          </div>
        </div>

        <!-- Form Actions Footer -->
        <div class="pt-6 border-t border-slate-100 flex flex-row-reverse items-center gap-3">
          <button type="submit"
                  :disabled="loading"
                  class="inline-flex justify-center items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50">
            Save Customer Profile
          </button>
          <router-link :to="{name: 'app.customers'}"
                       class="inline-flex justify-center rounded-xl border border-slate-200 px-4 py-2.5 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            Cancel
          </router-link>
        </div>
      </div>
    </form>
  </div>
  <div v-else class="py-24 text-center bg-white rounded-2xl border border-slate-200/80 p-8">
    <Spinner text="Loading customer profile..."/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import {useRoute, useRouter} from "vue-router";
import CustomInput from "../../components/core/CustomInput.vue";
import Spinner from "../../components/core/Spinner.vue";
import {ArrowLeftIcon, UserIcon, CreditCardIcon, TruckIcon} from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();

const title = ref('');
const customer = ref({
  billingAddress: {},
  shippingAddress: {}
});
const loading = ref(false);

const countries = computed(() => (store.state.countries || []).map(c => ({key: c.code, text: c.name})));
const billingCountry = computed(() => (store.state.countries || []).find(c => c.code === customer.value.billingAddress?.country_code) || {});
const billingStateOptions = computed(() => {
  if (!billingCountry.value || !billingCountry.value.states) return [];
  return Object.entries(billingCountry.value.states).map(c => ({key: c[0], text: c[1]}));
});
const shippingCountry = computed(() => (store.state.countries || []).find(c => c.code === customer.value.shippingAddress?.country_code) || {});
const shippingStateOptions = computed(() => {
  if (!shippingCountry.value || !shippingCountry.value.states) return [];
  return Object.entries(shippingCountry.value.states).map(c => ({key: c[0], text: c[1]}));
});

function onSubmit() {
  loading.value = true;
  customer.value.status = !!customer.value.status;
  store.dispatch('updateCustomer', customer.value)
    .then(() => {
      loading.value = false;
      store.commit('showToast', 'Customer profile updated successfully');
      router.push({name: 'app.customers'});
    })
    .catch(() => {
      loading.value = false;
      router.push({name: 'app.customers'});
    });
}

onMounted(() => {
  store.dispatch('getCountries');
  store.dispatch('getCustomer', route.params.id)
    .then(({data}) => {
      title.value = `Edit Customer: ${data.first_name} ${data.last_name}`;
      customer.value = {
        ...data,
        billingAddress: data.billingAddress || {},
        shippingAddress: data.shippingAddress || {}
      };
    });
});
</script>

<style scoped>
</style>
