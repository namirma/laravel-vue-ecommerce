<template>
  <div class="p-2">
    <div class="h-[360px]">
      <LineChart :data="chartData" :height="360"/>
    </div>
  </div>
</template>

<script setup>
import axiosClient from "../../axios.js";
import {ref, watch} from "vue";
import LineChart from "../../components/core/Charts/Line.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const chartData = ref({
  labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [{
    label: 'New Customer Registrations',
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 3,
    pointBackgroundColor: '#10B981',
    fill: true,
    tension: 0.35,
    data: [12, 19, 28, 24, 38, 52]
  }]
});

watch(route, () => {
  getData();
}, {immediate: true});

function getData() {
  axiosClient.get('report/customers', {params: {d: route.params.date}})
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
