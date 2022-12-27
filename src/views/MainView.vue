<script lang="ts">

import SelectComponent from "@/components/SelectComponent.vue";

import { defineComponent } from 'vue'
import axios from 'axios';
import type { IDataBarChart, IDataLineChart, IJobOffer } from '../interfaces/IJob';

export default defineComponent({
    components: {
        SelectComponent
    },
    data() {
        return {
            theme: this.$route.params.theme as string,
            countJobs: 0 as Number,
            jobs: [] as IJobOffer[],
            dataLineChart: [] as IDataLineChart[],
            dataBarChart: [] as IDataBarChart[],
            loadedBarChart: false,
            loadedLineChart: false,
            loadedJobs: false
        }
    },
    methods: {
        getData(period: string, source: string) {
            const backUrl = import.meta.env.VITE_URL_BACK;
            const query = `${period != '' || source != '' ? "?" : ""}${period}${period != '' ? "&" : ''}${source}`
            axios
                .get<IJobOffer[]>(`${backUrl}/job/${this.theme?.toLowerCase()}/all${query}`)
                .then(response => (this.jobs = response.data, this.loadedJobs = true));
            axios
                .get<Number>(`${backUrl}/stats/${this.theme?.toLowerCase()}/count${query}`)
                .then(response => (this.countJobs = response.data));

            axios
                .get<IDataLineChart[]>(`${backUrl}/stats/${this.theme?.toLowerCase()}/offers${query}`)
                .then(response => (this.dataLineChart = response.data, this.loadedLineChart = true))

            axios
                .get<IDataBarChart[]>(`${backUrl}/stats/${this.theme?.toLowerCase()}/company${query}`)
                .then(response => (this.dataBarChart = response.data, this.loadedBarChart = true))
        },
        refreshData(period: string, source: string) {
            this.loadedBarChart = false;
            this.loadedLineChart = false;
            this.loadedJobs = false;
            this.getData(period, source);
        }
    },
    mounted() {
        this.getData('', '');
    }
})

</script>


<template>
    <main>
        <section class="filters">
            <h3>
                <span id="nbOffers">{{ countJobs.toString() }}</span> Offres d'emploi {{
        theme.charAt(0).toUpperCase() + theme.substring(1).toLowerCase()
}}
            </h3>

            <SelectComponent @refresh-data="refreshData" />
        </section>
        <router-view :dataLineChart="dataLineChart" :loadedLineChart="loadedLineChart" :dataBarChart="dataBarChart"
            :loadedBarChart="loadedBarChart" :loadedJobs="loadedJobs" :jobs="jobs"></router-view>
    </main>
</template>

<style scoped>
main {
    background-color: #f9f8fd;
    height: 100%;
    padding: 2% 0 2% 0;
}

.filters {
    margin-left: 3rem;
}


h3 {
    font-weight: 600;
}

#indicatorJob {
    margin: 2% 0;
    background-color: #4a46de !important;
    color: #dfdfdf !important;
    border: 1px #4a46de solid;
    border-radius: 30px;
    padding: 1% 2%;
}

#nbOffers {
    font-size: 36px;
    font-weight: 700;
    color: #4a46de;
}
</style>