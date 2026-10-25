<template>
  <div class="space-y-6">
    <!-- Products Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          Products Catalog <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Inventory</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your store catalog, real-time pricing, stock status, and storefront visibility.
        </p>
      </div>

      <div>
        <button type="button"
                @click="showAddNewModal()"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition-all cursor-pointer">
          <PlusIcon class="w-4 h-4"/>
          Add New Product
        </button>
      </div>
    </div>

    <!-- Main Products Table -->
    <ProductsTable @clickEdit="editProduct"/>

    <!-- Create / Edit Product Modal -->
    <ProductModal v-model="showProductModal" :product="productModel" @close="onModalClose"/>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import store from "../../store";
import ProductModal from "./ProductModal.vue";
import ProductsTable from "./ProductsTable.vue";
import {PlusIcon} from "@heroicons/vue/24/outline";

const DEFAULT_PRODUCT = {
  id: '',
  title: '',
  description: '',
  image: '',
  price: '',
  published: true
}

const products = computed(() => store.state.products);
const productModel = ref({...DEFAULT_PRODUCT})
const showProductModal = ref(false);

function showAddNewModal() {
  productModel.value = {...DEFAULT_PRODUCT};
  showProductModal.value = true;
}

function editProduct(p) {
  store.dispatch('getProduct', p.id)
    .then(({data}) => {
      productModel.value = data;
      showProductModal.value = true;
    });
}

function onModalClose() {
  productModel.value = {...DEFAULT_PRODUCT};
}
</script>

<style scoped>
</style>
