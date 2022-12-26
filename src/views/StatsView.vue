<script lang="ts">

import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import SelectComponent from "@/components/SelectComponent.vue";

import { defineComponent, type PropType } from 'vue'
import axios from 'axios';
import type { IDataBarChart, IDataLineChart } from '../interfaces/IJob';

export default defineComponent({
    components: {
        BarChart,
        LineChart,
        SelectComponent
    },
    props: {
        dataLineChart: {
            type: Array as PropType<IDataLineChart[]>,
            default: () => []
        },
        loadedLineChart: {
            type: Boolean,
            default: () => false
        },
        dataBarChart: {
            type: Array as PropType<IDataBarChart[]>,
            default: () => []
        },
        loadedBarChart: {
            type: Boolean,
            default: () => false
        }
    }
})

</script>

<template>
    <main>
        <section class="charts">
            <div class="chart-container">
                <div class="chart-container-title">
                    <p class="chart-title">Evolution du nombre d'offres</p>
                </div>
                <div>
                    <LineChart v-if="loadedLineChart" :chart-data="dataLineChart" :label="'Nombre d\'offres'" />
                </div>
            </div>

            <div class="chart-container">
                <div class="chart-container-title">
                    <p class="chart-title">Nombre d'offres par entreprise</p>
                </div>
                <div>
                    <BarChart v-if="loadedBarChart" :chart-data="dataBarChart" :label="'Nombre d\'offres'" />
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.chart-container {
    background-color: #ffffff;
    border: 1px solid #c2c2c7;
    border-radius: 5px;
    margin: 2rem auto;
    max-width: 800px;
    min-height: 500px;
}

.chart-container-title {
    padding: 2% 3% 0 3%;
}

.chart-title {
    color: #4a4767;
    font-weight: 700;
    font-size: 18px
}
</style>