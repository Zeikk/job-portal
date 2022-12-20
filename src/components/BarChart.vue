<script lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import type { PropType } from "vue";
import { defineComponent } from 'vue'
import { Bar } from 'vue-chartjs'
import type { IDataBarChart } from "../interfaces/IJob";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default defineComponent({
    name: "BarChart",
    props: {
        label: {
            type: String,
            required: true
        },
        chartData: {
            type: Array as PropType<IDataBarChart[]>,
            default: () => [],
            required: true
        }
    },
    components: {
        Bar
    },
    data() {
        return {
            data: {
                labels: this.chartData.flatMap((value) => value.company),
                datasets: [{
                    label: this.label,
                    backgroundColor: "#4a46de",
                    data: this.chartData.flatMap((value) => value.offers)
                }]
            },
            options: {
                responsive: true
            }
        }
    }
})
</script>
  
<template>
    <Bar :data="data" :options="options" />
</template>