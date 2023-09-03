<template>
    <main class="w-screen h-screen flex flex-col items-center justify-center gap-y-6">
        <div>
            <img src="/assets/not_found.svg" class="w-64" />
        </div>
        <p class="font-medium">
            Waduh, halaman tidak ditemukan!
        </p>
        <router-link to="/">
            <button class="btn">Kembali</button>
        </router-link>
    </main>
</template>

<script setup>
</script>