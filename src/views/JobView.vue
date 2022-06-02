<script lang="ts">

import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import { defineComponent, ref } from 'vue'

interface IData {
    day: string,
    offers: number
}

export default defineComponent({
    components: {
        BarChart,
        LineChart
    },
    props: {
        theme: String
    },
    data() {
        return {
            currentIndex: 1,
            jobs: [{
                title: "Responsable data management",
                href: "https://fr.indeed.com/rc/clk?jk=e238eb69e4efa907&fccid=0aaead4d8c47d27f&vjs=3",
                company: "CHU de Caen",
                date: "2022-05-30T11:16:51.354+00:00"
            }, {
                title: "Ingénieur.e data – CDI – Caen ou Paris",
                href: "https://fr.indeed.com/rc/clk?jk=af638adb906c694a&fccid=3e3f0595514d0b46&vjs=3",
                company: "Soyhuce",
                date: "2022-06-01T09:43:25.056+00:00"
            }, {
                title: "Ingénieur.e data – CDI – Caen ou Paris",
                href: "https://fr.indeed.com/rc/clk?jk=af638adb906c694a&fccid=3e3f0595514d0b46&vjs=3",
                company: "Soyhuce",
                date: "2022-06-01T09:43:25.056+00:00"
            }, {
                title: "Ingénieur.e data – CDI – Caen ou Paris",
                href: "https://fr.indeed.com/rc/clk?jk=af638adb906c694a&fccid=3e3f0595514d0b46&vjs=3",
                company: "Soyhuce",
                date: "2022-06-01T09:43:25.056+00:00"
            }, {
                title: "Ingénieur.e data – CDI – Caen ou Paris",
                href: "https://fr.indeed.com/rc/clk?jk=af638adb906c694a&fccid=3e3f0595514d0b46&vjs=3",
                company: "Soyhuce",
                date: "2022-06-01T09:43:25.056+00:00"
            }, {
                title: "Principal Data Manager",
                href: "https://fr.indeed.com/rc/clk?jk=af638adb906c694a&fccid=3e3f0595514d0b46&vjs=3",
                company: "AL2S3 LTD",
                date: "2022-06-01T09:43:25.056+00:00"
            }, {
                title: "Principal Data Manager",
                href: "https://fr.indeed.com/rc/clk?jk=af638adb906c694a&fccid=3e3f0595514d0b46&vjs=3",
                company: "AL2S3 LTD",
                date: "2022-06-01T09:43:25.056+00:00"
            }, {
                title: "Principal Data Manager",
                href: "https://fr.indeed.com/rc/clk?jk=af638adb906c694a&fccid=3e3f0595514d0b46&vjs=3",
                company: "AL2S3 LTD",
                date: "2022-06-01T09:43:25.056+00:00"
            }, {
                title: "Principal Data Manager",
                href: "https://fr.indeed.com/rc/clk?jk=af638adb906c694a&fccid=3e3f0595514d0b46&vjs=3",
                company: "AL2S3 LTD",
                date: "2022-06-01T09:43:25.056+00:00"
            }],
            dataLineChart: ref<IData[]>([{
                day: "2022-01-06",
                offers: 18
            },
            {
                day: "2022-01-07",
                offers: 7
            },
            {
                day: "2022-01-08",
                offers: 4
            },
            {
                day: "2022-01-10",
                offers: 4
            }]),
            dataBarChartChart: [{
                company: "CHU de Caen",
                offers: 18
            },
            {
                company: "Soyhuce",
                offers: 4
            }]
        }
    },
    methods: {
        incrementIndex() {
            this.currentIndex++;
            this.slideRight();
        },
        decrementIndex() {
            this.currentIndex--;
            this.slideLeft();
        },
        slideLeft() {
            const slider = document.querySelector('.job-slider')
            if (slider !== null) {
                slider.scrollLeft = slider.scrollLeft - (window.innerWidth * (15 / 100));
            }
        },
        slideRight() {
            const slider = document.querySelector('.job-slider')
            if (slider !== null) {
                slider.scrollLeft = (window.innerWidth * (15 / 100)) + slider.scrollLeft;
            }
        }
    },
    computed: {
        cssVars() {
            return {
                '--length': this.jobs.length,
                '--size': "15vw"
            }
        }
    }
})
</script>

<template>
    <main>
        <h3>
            <span id="nbOffers">15</span> Offres d'emploi {{ theme }}
        </h3>

        <section class="container">
            <div>
                <div class="job-slider" :style="cssVars">
                    <li v-for="job in jobs" class="job-container">
                        <a :href="job.href" class="job-link">
                            <h5 class="job-title">{{ job.title }}</h5>
                            <p>{{ job.company }}</p>
                        </a>
                    </li>
                </div>
                <div class="container">
                    <div class="buttons-job">
                        <button v-if="currentIndex > 1" class="btn btn-outline-primary" aria-label="Previous"
                            v-on:click="decrementIndex">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                        <button v-else type="button" class="btn btn-outline-secondary" disabled>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                        <button v-if="currentIndex < jobs.length - 1" class="btn btn-outline-primary" aria-label="Next"
                            v-on:click="incrementIndex">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                        <button v-else type="button" class="btn btn-outline-secondary" disabled>
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </div>
                </div>

            </div>

            <div class="chart-container">
                <div class="chart-container-title">
                    <p class="chart-title">Evolution du nombre d'offres</p>
                </div>
                <div>
                    <LineChart :chart-data="dataLineChart" :width="1000" :height="250" :margin="50" />
                </div>
            </div>

            <div class="chart-container">
                <div class="chart-container-title">
                    <p class="chart-title">Nombre d'offres par entreprise</p>
                </div>
                <div>
                    <BarChart :chart-data="dataBarChartChart" :width="1000" :height="250" :margin="50" />
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
main {
    background-color: #f9f8fd;
    height: 100%;
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

#nbOffers {
    font-size: 36px;
    font-weight: 700;
    color: #4a46de;
    margin-left: 2%;
}

.job-slider {
    list-style: none;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(var(--length), var(--size));
    grid-column-gap: 5rem;
    overflow: hidden;
    margin-top: 2%;
}

.job-container {
    background-color: #ffffff;
    border: 2px solid #eef1f3;
    border-radius: 10px;
    padding: 3% 5%;
}

.job-link {
    text-decoration: none !important;
    color: #4a4767;
}

.job-title {
    font-weight: 600;
    color: #000;
}

.buttons-job {
    display: flex;
    justify-content: end;
    gap: 3%;
}

.chart-container {
    background-color: #ffffff;
    border: 1px solid #c2c2c7;
    border-radius: 5px;
    margin: 5% 0;
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