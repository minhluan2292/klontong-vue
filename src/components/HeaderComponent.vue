<template>
    <header
        class="fixed w-full px-6 flex flex1 items-center h-16 border-b-[1px] backdrop-blur bg-white/80 z-50 rounded-br-2xl rounded-bl-2xl">
        <nav class="flex items-center flex-1 justify-between">
            <div class="flex items-center gap-3">
                <button class="btn">
                    <img src="/assets/burger-icon.svg" class="w-5 aspect-square" />
                </button>
                <!-- <a v-for="link in links" :href="link.url" :key="link.title" class="font-medium">
                    {{ link.title }}
                </a> -->
            </div>
            <div class="flex pr-3 mx-auto">
                <a href="/">
                    <img src="/assets/klontong.svg" class="h-7" />
                </a>
            </div>
            <div class="flex">
                <button class="btn">
                    <img src="/assets/trolley.svg" class="h-5" />
                </button>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data: () => {
        return {
            links: [
                {
                    url: "/product",
                    title: "Products"
                },
                {
                    url: "/category",
                    title: "Categories"
                },
            ],
        };
    }
}
</script>