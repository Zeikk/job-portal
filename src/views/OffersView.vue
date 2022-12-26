<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { IJobOffer } from '../interfaces/IJob';

export default defineComponent({
    props: {
        jobs: {
            type: Array as PropType<IJobOffer[]>,
            default: () => null
        },
        loadedJobs: {
            type: Boolean,
            default: () => false
        }
    }
})
</script>

<template>
    <main>
        <div v-if="!loadedJobs" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-if="loadedJobs && jobs.length == 0" class="d-flex justify-content-center align-items-center h-100">
            <h3>Aucun Résultat</h3>
        </div>
        <ul v-if="loadedJobs && jobs.length > 0" class="list-group list-group-flush">
            <li v-for="job in jobs" class="list-group-item d-flex justify-content-between align-items-start">
                <a :href="job.href" target="_blank">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">{{ job.title }}</div>
                        <div class="fw-light">{{ new Date(job.date).toLocaleDateString() }}</div>
                        <div class="fw-normal">{{ job.company }}</div>
                    </div>
                </a>
            </li>
        </ul>
    </main>
</template>

<style scoped>
.list-group {
    margin: auto;
    width: 30rem;
}

.list-group-item {
    margin: .5rem 0;
    border: 1px solid #c2c2c7;
}

a {
    width: 100%;
    text-decoration: none;
    color: black;
}
</style>