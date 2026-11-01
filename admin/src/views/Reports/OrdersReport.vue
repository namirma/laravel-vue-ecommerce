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
import { isDemoMode } from "../../config.js";

const route = useRoute();
// Sample series, used ONLY in demo mode. In live mode the chart starts
// empty and is filled from /report/orders, so a failed API call never
// leaves sample figures on screen as if they were real orders.
const demoChartData = {
  labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [{
    label: 'Orders Fulfilled',
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    data: [45, 62, 85, 74, 98, 124]
  }]
};
const emptyChartData = {
  labels: [],
  datasets: [{
    label: 'Orders Fulfilled',
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    data: []
  }]
};
const chartData = ref(isDemoMode ? demoChartData : emptyChartData);

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
      chartData.value = isDemoMode ? demoChartData : emptyChartData;
    });
}
</script>

<style scoped>
</style>
