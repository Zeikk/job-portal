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
            Portal
        </span>
        <div id="tabs">
            <RouterLink to="/data">
                <IconCloud />Data
            </RouterLink>
            <RouterLink to="/web">
                <IconGlob />Web
            </RouterLink>
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
    color: #4a46de !important;
    font-size: 28px;
    font-weight: 700;
    margin: 10% 0;
}

nav a {
    color: #dfdfdf !important;
    text-decoration: none;
    border: none;
    font-size: 18px;
    font-weight: 600;
    margin: 5% 0;
    padding: 2% 0;
    border: 1px #ffffff solid;
}

nav a:hover {
    background-color: #4a46de !important;
    color: #dfdfdf !important;
    opacity: 0.2;
    border: 1px #4a46de solid;
    border-radius: 30px;
}

nav a svg {
    margin: 0 5%;
}

.router-link-active {
    color: #4a46de !important;
}

#tabs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60%;
}
</style>