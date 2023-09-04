<template>
    <main class="w-screen h-screen flex flex-col items-center justify-center">
        <LoadingComponent />
    </main>
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue';

export default {
    name: "LoadingView",
    components: { LoadingComponent }
}
</script>