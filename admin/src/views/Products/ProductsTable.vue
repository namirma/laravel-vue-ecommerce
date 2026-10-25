<template>
  <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
    <!-- Top Filter Bar -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100">
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <span class="text-xs font-semibold text-slate-500 whitespace-nowrap">Show</span>
        <select @change="getProducts(null)" v-model="perPage"
                class="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
        <span class="text-xs text-slate-400 font-medium">({{ products.total || products.data.length }} items)</span>
      </div>

      <div class="w-full sm:w-64">
        <input v-model="search" @input="getProducts(null)"
               class="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 placeholder-slate-400 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
               placeholder="Search products by title...">
      </div>
    </div>

    <!-- Products Table -->
    <div class="overflow-x-auto mt-4">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
        <tr>
          <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection" @click="sortProducts('id')" class="py-3 px-4">
            ID
          </TableHeaderCell>
          <TableHeaderCell field="image" :sort-field="sortField" :sort-direction="sortDirection" class="py-3 px-4">
            Image
          </TableHeaderCell>
          <TableHeaderCell field="title" :sort-field="sortField" :sort-direction="sortDirection" @click="sortProducts('title')" class="py-3 px-4">
            Product Title
          </TableHeaderCell>
          <TableHeaderCell field="price" :sort-field="sortField" :sort-direction="sortDirection" @click="sortProducts('price')" class="py-3 px-4">
            Price
          </TableHeaderCell>
          <TableHeaderCell field="updated_at" :sort-field="sortField" :sort-direction="sortDirection" @click="sortProducts('updated_at')" class="py-3 px-4">
            Status
          </TableHeaderCell>
          <TableHeaderCell field="actions" class="py-3 px-4 text-right">
            Actions
          </TableHeaderCell>
        </tr>
        </thead>
        <tbody v-if="products.loading">
        <tr>
          <td colspan="6" class="py-12 text-center">
            <Spinner text="Loading catalog..."/>
          </td>
        </tr>
        </tbody>
        <tbody v-else-if="!products.data || !products.data.length">
        <tr>
          <td colspan="6" class="py-12 text-center text-slate-400 text-xs font-medium">
            No products found matching your search.
          </td>
        </tr>
        </tbody>
        <tbody v-else class="divide-y divide-slate-100 text-slate-700">
        <tr v-for="product of products.data" :key="product.id" class="hover:bg-slate-50/80 transition-colors">
          <td class="py-3 px-4 font-bold text-slate-500">#{{ product.id }}</td>
          <td class="py-3 px-4">
            <img class="w-12 h-12 object-cover rounded-xl border border-slate-200/80 shadow-2xs"
                 :src="product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'"
                 :alt="product.title">
          </td>
          <td class="py-3 px-4 max-w-[280px]">
            <span class="font-bold text-slate-900 block truncate">{{ product.title }}</span>
            <span class="text-[11px] text-slate-400 block truncate">Updated {{ product.updated_at }}</span>
          </td>
          <td class="py-3 px-4 font-extrabold text-slate-900">
            {{ $filters.currencyUSD(product.price) }}
          </td>
          <td class="py-3 px-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Published
            </span>
          </td>
          <td class="py-3 px-4 text-right">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                  <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true"/>
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems class="absolute z-20 right-0 mt-1 w-32 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 divide-y divide-slate-100 p-1 focus:outline-none">
                  <div class="p-1">
                    <MenuItem v-slot="{ active }">
                      <button @click="editProduct(product)"
                              :class="[active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700', 'group flex w-full items-center rounded-lg px-2.5 py-1.5 text-xs font-medium gap-2 transition-colors']">
                        <PencilSquareIcon class="h-4 w-4"/>
                        Edit
                      </button>
                    </MenuItem>
                  </div>
                  <div class="p-1">
                    <MenuItem v-slot="{ active }">
                      <button @click="deleteProduct(product)"
                              :class="[active ? 'bg-rose-50 text-rose-600' : 'text-rose-600', 'group flex w-full items-center rounded-lg px-2.5 py-1.5 text-xs font-medium gap-2 transition-colors']">
                        <TrashIcon class="h-4 w-4"/>
                        Delete
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div class="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
      <span>Showing 1 to {{ products.data.length }} of {{ products.total || products.data.length }} products</span>
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
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {EllipsisVerticalIcon, PencilSquareIcon, TrashIcon} from "@heroicons/vue/24/outline";

const perPage = ref(10);
const search = ref('');
const products = computed(() => store.state.products);
const sortField = ref('updated_at');
const sortDirection = ref('desc');

const emit = defineEmits(['clickEdit'])

onMounted(() => {
  getProducts();
})

function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  getProducts(link.url)
}

function getProducts(url = null) {
  store.dispatch("getProducts", {
    url,
    search: search.value,
    per_page: perPage.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  });
}

function sortProducts(field) {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
  getProducts()
}

function editProduct(p) {
  emit('clickEdit', p)
}

function deleteProduct(product) {
  if (!confirm(`Are you sure you want to delete "${product.title}"?`)) {
    return;
  }
  store.dispatch('deleteProduct', product.id)
    .then(() => {
      store.commit('showToast', 'Product was successfully deleted');
      getProducts();
    })
    .catch(() => {
      // Local removal in demo
      const index = products.value.data.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products.value.data.splice(index, 1);
        store.commit('showToast', 'Product removed (demo mode)');
      }
    });
}
</script>

<style scoped>
</style>
