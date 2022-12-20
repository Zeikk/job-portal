<script lang="ts">

import type { IDataLineChart } from '@/interfaces/IJob';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { defineComponent, type PropType } from 'vue';
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default defineComponent({
    name: "Line Chart",
    components: {
        Line
    },
    props: {
        label: {
            type: String,
            required: true
        },
        chartData: {
            type: Array as PropType<IDataLineChart[]>,
            default: () => [],
            required: true
        },
    },
    data() {
        return {
            data: {
                labels: this.chartData.flatMap((value) => value.date),
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
});
</script>


<template>
    <Line :data="data" :options="options" />
</template>

