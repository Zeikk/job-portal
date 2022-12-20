<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "select",
    methods: {
        convertPeriodToDate() {
            let date: Date | null = new Date();
            switch (this.period) {
                case "EVER": date = null; break;
                case "MONTH": date.setMonth(date.getMonth() - 1); break;
                case "FIFTEEN": date.setDate(date.getDate() - 15); break;
                case "YESTERDAY": date.setDate(date.getDate() - 1); break;
                case "TODAY": date = new Date(); break;

            }
            return date ? `?date=${date!.toISOString().substring(0, 10)}` : ''
        },
        handlePeriod(event: Event) {
            this.period = (event.target as HTMLInputElement).value;
            this.$emit('refresh-data', this.convertPeriodToDate());
        }
    },
    data() {
        return { period: "EVER" }
    }
})
</script>

<template>
    <select class="dropdown" @change="handlePeriod">
        <option value="EVER" selected>Toujours</option>
        <option value="MONTH">Dernier mois</option>
        <option value="FIFTEEN">15 dernier jours</option>
        <option value="YESTERDAY">Hier</option>
        <option value="TODAY">Aujourd'hui</option>
    </select>
</template>

<style scoped>
.dropdown {
    background-color: white;
    border-color: #c2c2c7;
    padding: .5rem 2.5rem .5rem .75rem;
    border-width: 1px;
    border-radius: .375rem;
}
</style>