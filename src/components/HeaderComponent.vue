<template>
    <header
        class="fixed w-full px-2 md:px-6 flex flex1 items-center h-16 border-b-[1px] backdrop-blur bg-white/80 z-50 rounded-br-2xl rounded-bl-2xl">
        <nav class="flex items-center flex-1 justify-between">
            <div class="flex-1 flex items-center gap-3">
                <button class="btn">
                    <img src="/assets/burger-icon.svg" class="w-5 aspect-square" />
                </button>
                <!-- <a v-for="link in links" :href="link.url" :key="link.title" class="font-medium">
                    {{ link.title }}
                </a> -->
            </div>
            <div class="flex-1 flex pr-3 mx-auto justify-center">
                <router-link to="/">
                    <img src="/assets/klontong.svg" class="h-7" />
                </router-link>
            </div>
            <div class="flex-1 flex justify-end items-center gap-2">
                <div v-if="showSearch" class="border-[1px] rounded-md py-1 px-2 items-center hidden md:flex">
                    <input v-model="keyword" @keydown.enter="changeKeyword" class="outline-none" />
                    <button @click="changeKeyword">
                        <img src="/assets/search.svg" class="w-5 h-5" />
                    </button>
                </div>
                <button class="btn">
                    <img src="/assets/trolley.svg" class="h-5 w-5" />
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
    },
    computed: {
        showSearch() {
            return this.$router.currentRoute.value.name !== 'home'
        },
        keyword() {
            return this.$store.state.products.search.query
        }
    },
    methods: {
        changeKeyword(event) {
            if (event.target.value) {
                this.$store.commit('setProductsSearch', {
                    query: event.target.value,
                });
                this.$router.push({ path: '/product', query: { q: event.target.value } });

                this.$store.dispatch('fetchProducts');
            }
        }
    }
}
</script>