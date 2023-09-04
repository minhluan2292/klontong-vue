<template>
  <HeaderComponent />
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';

import { useStore } from 'vuex';

import HeaderComponent from './components/HeaderComponent.vue';

const store = useStore();
onMounted(() => {
  store.dispatch('fetchSuggestions');
})
</script>

<style>
* {
  font-family: 'Inter', sans-serif;
}


@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
</style>