<script lang="ts">

import * as d3 from "d3";
import Histogram from "@/components/Histogram";
import { defineComponent } from 'vue'

export default defineComponent({
    name: "App",
    data() {
        return {
            data: {
                normal: d3.range(0, 2000).map(d3.randomNormal()),
                logNormal: d3.range(0, 2000).map(d3.randomLogNormal()),
                bates: d3.range(0, 2000).map(d3.randomBates(10)),
                irwinHall: d3.range(0, 2000).map(d3.randomIrwinHall(10)),
                exponential: d3.range(0, 2000).map(d3.randomExponential(0.05))
            },
            width: 300,
            height: 200,
            bins: 40,
            sampleSize: 200,
            selectedDistribution: "normal"
        };
    },
    computed: {
        selectedData() {
            return this.data[this.selectedDistribution].slice(
                0,
                parseInt(this.sampleSize)
            );
        },
        distributions() {
            return Object.keys(this.data);
        }
    },
    components: {
        Histogram: Histogram
    }
});

</script>

<template>
    <main>
        <h3>Offres d'emploi Data</h3>
        <div id="indicatorJob" class="container">
            <div class="row align-items-center justify-content-between">
                <div className="col-sm-3">

                    <div><span id="nbJobs">15</span> offres d'emploi en 15 jours</div>

                </div>
                <div className="col-sm-3">
                    <img src="../assets/job-offers.png" class="img" />
                </div>
            </div>
        </div>

        <div id="indicatorJob" class="container">
            <Histogram :data="selectedData" :width="width" :height="height" :num-bins="parseInt(bins)" />
            <div class="row">
                <div class="col">
                    <span>Random distribution</span>
                    <select v-model="selectedDistribution">
                        <option v-for="k in distributions" :key="k">{{ k }}</option>
                    </select>
                </div>
                <div class="col">
                    <span>Sample size : {{ sampleSize }}</span>
                    <input type="range" v-model="sampleSize" min="10" max="2000" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: #f9f8fd;
    height: 100vh;
    padding: 3%;

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

#nbJobs {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
}

.img {
    width: 250px;
}
</style>