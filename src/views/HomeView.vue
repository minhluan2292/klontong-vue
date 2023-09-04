<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center font-medium bg-main gap-6">
    <div class="text-white text-center px-2">
      <h1 class=" text-lg md:text-3xl font-semibold">Tentukan Daftar Belanja Anda Sekarang!</h1>
      <h2 class="text-xs md:text-lg">
        Mulailah pengalaman berbelanja kelontong online yang menyenangkan
      </h2>
    </div>
    <div class="bg-white rounded-2xl px-4 py-3 flex justify-center active:outline-none">
      <input class="outline-none" v-model="query" @keydown.enter="search" />
      <button class="w-6 h-6" @click="search"><img src="/assets/search.svg" /></button>
    </div>
    <div class="flex flex-wrap gap-4 text-white min-h-[2rem] px-4">
      <span v-for="s in suggestions" :key="s" class="underline text-xs md:text-base">
        <router-link :to="`/product?q=${s}`">
          {{ s }}
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data: function () {
    return {
      query: ''
    };
  },
  methods: {
    search() {
      if (this.query.length < 1) return;
      this.$router.push({ path: '/product', query: { q: this.query } });
    }
  },
  computed: {
    suggestions() {
      return this.$store.state.suggestion.data
    }
  }
}
</script>
