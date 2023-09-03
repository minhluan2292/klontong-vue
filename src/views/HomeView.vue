<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center font-medium bg-main gap-6">
    <div class="text-white text-center">
      <h1 class="text-3xl font-semibold">Tentukan Daftar Belanja Anda Sekarang!</h1>
      <h2 class="text-lg">
        Mulailah pengalaman berbelanja kelontong online yang menyenangkan
      </h2>
    </div>
    <div class="bg-white rounded-2xl px-4 py-3 flex justify-center active:outline-none">
      <input class="outline-none" v-model="query" @keydown.enter="search" />
      <button class="w-6 h-6" @click="search"><img src="/assets/search.svg" /></button>
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
      this.$router.push({ path: '/product', query: { q: this.query } });
    }
  }
}
</script>
