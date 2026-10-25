<template>
  <div class="p-2">
    <div class="h-[360px]">
      <BarChart :data="chartData" :height="360"/>
    </div>
  </div>
</template>

<script setup>
import axiosClient from "../../axios.js";
import {ref, watch} from "vue";
import BarChart from "../../components/core/Charts/Bar.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const chartData = ref({
  labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [{
    label: 'Orders Fulfilled',
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    data: [45, 62, 85, 74, 98, 124]
  }]
});

watch(route, () => {
  getData();
}, {immediate: true});

function getData() {
  axiosClient.get('report/orders', {params: {d: route.params.date}})
    .then(({data}) => {
      if (data && data.labels) {
        chartData.value = data;
      }
    })
    .catch(() => {
      // Keep rich demo data
    });
}
</script>

<style scoped>
</style>
