<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconAnalytics from './icons/IconAnalytics.vue'
import IconGlob from './icons/IconGlob.vue'
import IconCloud from './icons/IconCloud.vue'

</script>

<template>

    <nav>
        <span>
            <IconAnalytics />
            Portail
        </span>
        <div id="tabs">
            <RouterLink to="/data/offers" :class="{ 'router-link-active': $route.fullPath.includes('data') }">
                <IconCloud height="24" width="24" />Data
            </RouterLink>
            <div class="sub-tabs" v-if="$route.fullPath.includes('data')">
                <RouterLink to="/data/offers">
                    Offres
                </RouterLink>
                <RouterLink to="/data/stats">
                    Statistiques
                </RouterLink>
            </div>
            <RouterLink to="/web/offers" :class="{ 'router-link-active': $route.fullPath.includes('web') }">
                <IconGlob height="24" width="24" />Web
            </RouterLink>
            <div class="sub-tabs" v-if="$route.fullPath.includes('web')">
                <RouterLink to="/web/offers">
                    Offres
                </RouterLink>
                <RouterLink to="/web/stats">
                    Statistiques
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    position: fixed;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    top: 0;
    height: 100%;
    width: 15%;
    padding: 0 2%;
}

nav span {
    color: #4a46de;
    font-size: 28px;
    font-weight: 700;
    margin: 10% 0;
}

nav a {
    color: #dfdfdf;
    text-decoration: none;
    border: none;
    font-size: 18px;
    font-weight: 600;
    margin: 2% 0;
    padding: 1% 0;
    border: 1px #ffffff solid;
    width: 200%;
}

nav a:hover {
    background-color: #4a46de;
    color: #dfdfdf;
    opacity: 0.2;
    border-radius: 30px;
    width: 200%;
}

nav a svg {
    margin: 0 5%;
}

.router-link-active {
    color: #4a46de;
}

#tabs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60%;
}

.sub-tabs {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.sub-tabs a {
    text-align: right;
    font-size: 16px;
    padding-right: 100%;
}

.sub-tabs a:hover {
    background-color: #4a46de;
    color: #dfdfdf;
    opacity: 0.2;
}
</style>