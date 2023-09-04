
<template>
    <ModalComponent :isOpen="msg !== ''" :onClose="closeMsg">
        <div class="flex flex-col items-center h-full justify-center text-center gap-4">
            <p class="font-medium">
                {{ msg }}
            </p>
            <button class="btn" @click="closeMsg">Ok</button>

        </div>
    </ModalComponent>
    <LoadingView v-if="isLoading" />
    <NotFoundComponent v-if="isNotFound && !isLoading" />

    <div v-if="!isLoading && isError" class="h-screen w-screen flex items-center justify-center">
        <ErrorComponent />
    </div>
    <main v-if="!isLoading && !isNotFound && !isError"
        class="flex flex-col md:flex-row max-w-7xl mx-auto pt-24 gap-8 px-6 md:px-0 py-10">
        <div class="flex-[2_2_0%]">
            <div class="border-2 rounded-md">
                <img :src="product.image" class="rounded-md" />
            </div>

        </div>
        <div class="flex-[4_4_0%] bg-blue space-y-3">
            <h1 class="text-xl font-semibold">{{ product.name }}</h1>
            <h2 class="text-2xl font-bold">{{ toRupiah(product.price) }}</h2>
            <div v-if="product.category">
                <router-link :to="`/product/?q=${product.categoryId}`">
                    <span class="p-1 bg-primary-400 text-white text-xs rounded-md font-medium">
                        {{ product.category.name }}
                    </span>
                </router-link>
            </div>

            <div>
                <p><span class="text-gray-500">Dimension:</span> {{
                    `${product.width}cm x ${product.length}cm x ${product.height}cm`
                }}</p>
                <p><span class="text-gray-500">Berat:</span> {{ product.weight }}gr</p>
                <p>{{ (product.description) }}</p>
            </div>
        </div>
        <div class="flex-[2_2_0%]">
            <div class="border-2 px-3 py-5 flex flex-col space-y-3 rounded-lg">
                <p class="text-lg font-medium">Atur jumlah</p>
                <div class="border-[1px] rounded-lg flex justify-center items-center gap-2 px-2 py-1 max-w-xs">
                    <button @click="decrement" class="flex items-center group" :disabled="qty < 2">
                        <svg class="group-disabled:fill-primary-200 fill-primary-600" viewBox="0 0 24 24" width="16px"
                            height="16px" style="display: inline-block; vertical-align: middle;">
                            <path d="M20 12.75H4a.75.75 0 110-1.5h16a.75.75 0 110 1.5z"></path>
                        </svg>
                    </button>
                    <input class="outline-none text-center" v-model="qty" @input="changeQty" />
                    <button @click="increment" class="group flex items-center" :disabled="qty >= max">
                        <svg class="fill-primary group-disabled:fill-primary-200" viewBox="0 0 24 24" width="16px"
                            height="16px" style="display: inline-block; vertical-align: middle;">
                            <path
                                d="M20 11.25h-7.25V4a.75.75 0 10-1.5 0v7.25H4a.75.75 0 100 1.5h7.25V20a.75.75 0 101.5 0v-7.25H20a.75.75 0 100-1.5z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div class="flex justify-between">
                    <p class="text-gray-500">Subtotal</p>
                    <p class="text-lg font-semibold">{{ toRupiah(subtotal) }}</p>
                </div>
                <button @click="addToCart" class="btn" :disabled="qty < 1">+ Keranjang</button>
            </div>
        </div>
    </main>
</template>

<script setup>
import {
    computed,
    onMounted,
    ref,
} from 'vue';

import { useRoute } from 'vue-router';

import ErrorComponent from '@/components/ErrorComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import NotFoundComponent from '@/components/NotFoundComponent.vue';
import store from '@/store';
import {
    nl2br,
    toRupiah,
} from '@/utils/formatter';
import { getProductDetail } from '@/utils/https/product';
import LoadingView from '@/views/LoadingView.vue';

const route = useRoute();

const isLoading = ref(true);
const isNotFound = ref(false);
const isError = ref(false);
const msg = ref("");
const closeMsg = () => msg.value = "";
const product = ref({
    category: {
        name: "",
        id: ""
    },
    categoryId: 0,
    description: "",
    height: 0,
    id: 0,
    image: "",
    length: 0,
    name: "",
    price: 0,
    sku: "",
    weight: 0,
    width: 0,
});
const qty = ref(1);
const max = 30000;
const increment = () => qty.value++;
const decrement = () => qty.value--;
const changeQty = (event) => {
    const qtyInput = parseInt(event.target.value);
    if (!isNaN(qtyInput)) qty.value = qtyInput;
    if (qtyInput > max) qty.value = max;
}
const subtotal = computed(() => product.value.price * qty.value);

const addToCart = () => {
    if (isLoading.value === true || isNotFound.value === true) return;
    const { name, id, price, image } = product.value;
    console.log(image);
    store.dispatch('addToCart', {
        name, id, price, image, qty: qty.value
    });
    msg.value = "Product telah berhasil ditambahkan ke keranjang";
}

// @ is an alias to /src

onMounted(() => {
    const { id } = route.params;
    getProductDetail(id).then((result) => {
        console.log(result.data.data);
        if (!result.data.data) isNotFound.value = true;
        else product.value = result.data.data;
    }).catch((err) => {
        console.log(err);
        isError.value = true;
    }).finally(() => {
        isLoading.value = false;
    })

});
</script>
