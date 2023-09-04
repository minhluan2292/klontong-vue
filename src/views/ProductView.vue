<template>
    <LoadingView v-if="isLoading" />
    <div v-if="!isLoading && isError" class="h-screen w-screen flex items-center justify-center">
        <ErrorComponent />
    </div>
    <main v-if="!isLoading && !isError"
        class="flex flex-col md:flex-row md:max-w-5xl  lg:max-w-7xl mx-auto pt-3 md:pt-24 gap-2 md:gap-8 px-3">
        <div class="flex-1 sticky p-4 md:p-0">
            <div class=" border-[1px] rounded-lg p-3 select-none mt-16">
                <!-- <h1 class='font-medium'>Search</h1>
                <input class="w-full my-3 p-1 border-[1px] rounded-lg" /> -->


                <div class="flex gap-x-2 items-center">
                    <div>
                        <select class="border-[1px] rounded-md px-2 py-1 text-sm" v-model="orderBy" @change="changeOrderBy">
                            <option value="id" selected>Sort By</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>

                    </div>
                </div>
                <!-- <h1 class='font-medium'>Category</h1>
                <div class="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="" name="default-radio"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                    <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 ">
                        Snack
                    </label>
                </div> -->
            </div>

        </div>
        <div class="flex-[3_3_0%] bg-blue  p-4 md:p-0">
            <div class="h-16 flex justify-between items-center">
                <p>Showing <b>{{ products.length }}</b> results</p>
            </div>
            <div v-if="isNotFound">
                <div class="flex items-center gap-4">
                    <img src="/assets/directions.svg" class="h-32" />
                    <div>
                        <p class="text-lg font-medium">Oops, produk nggak ditemukan</p>
                        <p class="text-gray-500">Coba kata kunci lain dah, kali aja nemu</p>
                    </div>
                </div>
            </div>
            <div v-if="products.length > 0"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-4">
                <router-link :to="`/product/${product.id}`" class="border-[1px] rounded-xl flex flex-col"
                    v-for="product in products" :key="product" title="KitKat 150gr">
                    <div class=" ">
                        <img :src="product.image" class="rounded-t-xl w-full aspect-square object-contain" loading="lazy" />
                    </div>
                    <div class="p-3 rounded-b-xl border-t-[1px]">
                        <p class="font-semibold">{{ product.name }}</p>
                        <p class="text-sm">{{ toRupiah(product.price) }}</p>
                    </div>
                </router-link>

            </div>
            <div class="mb-10"></div>
        </div>
    </main>
</template>


<script>
import ErrorComponent from '@/components/ErrorComponent.vue';
import { toRupiah } from '@/utils/formatter.js';
import LoadingView from '@/views/LoadingView.vue';

// @ is an alias to /src

export default {
    name: 'ProductView',
    data: () => ({
        orderBy: "id"
    }),
    methods: {
        getProducts() {
            const { q = "", orderBy = "id" } = this.$route.query;
            if (q) this.$store.commit('setProductsSearch', {
                query: q,
                orderBy
            });

            this.$store.dispatch('fetchProducts');
        },
        toRupiah(nominal = 0) {
            return toRupiah(nominal);
        },
        changeOrderBy(event) {
            this.$router.push({
                path: '/product', query: {
                    ...this.$route.query,
                    orderBy: event.target.value
                }
            });
            this.getProducts();
        }
    },
    computed: {
        products() {
            return this.$store.state.products.data;
        },
        isNotFound() {
            return this.$store.state.products.isNotFound;
        },
        isLoading() {
            return this.$store.state.products.isLoading;
        },
        isError() {
            return this.$store.state.products.isError;
        },
    },
    components: { LoadingView, ErrorComponent },
    mounted() {
        this.getProducts();
    }
}
</script>
