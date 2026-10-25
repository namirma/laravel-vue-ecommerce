<template>
  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize border"
        :class="badgeClass">
    <span class="w-1.5 h-1.5 rounded-full" :class="dotClass"></span>
    {{ order.status || 'paid' }}
  </span>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  order: Object
})

const badgeClass = computed(() => {
  const s = props.order?.status;
  switch (s) {
    case 'paid':
    case 'completed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'shipped':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'cancelled':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'unpaid':
    default:
      return 'bg-amber-50 text-amber-700 border-amber-200';
  }
})

const dotClass = computed(() => {
  const s = props.order?.status;
  switch (s) {
    case 'paid':
    case 'completed':
      return 'bg-emerald-500';
    case 'shipped':
      return 'bg-blue-500';
    case 'cancelled':
      return 'bg-rose-500';
    case 'unpaid':
    default:
      return 'bg-amber-500';
  }
})
</script>

<style scoped>
</style>
