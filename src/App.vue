<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <header>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
  </header>

  <Navbar />

  <RouterView :key="$route.fullPath" />

</template>

<style>
@import '@/assets/base.css';

#app {
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 6fr;
  padding: 0;
  font-weight: normal;
  background-color: #f9f8fd;
  height: calc(100vh - 10px);
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}
</style>
