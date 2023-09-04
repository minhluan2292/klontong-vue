<template>
    <main class="flex flex-col md:flex-row md:max-w-4xl lg:max-w-7xl mx-auto pt-3 md:pt-24 gap-2 md:gap-8 px-4">
        <section class="flex-[2_2_0%] lg:flex-[3_3_0%] px-4 md:px-0">
            <p class="text-xl font-semibold pt-20 md:pt-0">Keranjang</p>
            <div v-if="cart.length > 0" class="flex flex-col gap-3 mt-5">
                <div v-for="product in cart" :key="product.id"
                    class="bg-gray-100 flex p-4 rounded-md gap-1 md:gap-4 relative">
                    <div class="absolute top-2 right-2">
                        <button @click="deleteProductCart(product.id)">
                            <img src="/assets/trash.svg" />
                        </button>
                    </div>
                    <div class="w-28 h-28 p-1">
                        <router-link :to="`/product/${product.id}`">
                            <img :src="product.image ?? '/assets/product-placeholder.jpg'" class="rounded-lg" />
                        </router-link>
                    </div>
                    <div class="flex flex-col gap-2">
                        <router-link :to="`/product/${product.id}`">
                            <p class="font-medium text-gray-700">{{ product.name }}</p>
                        </router-link>
                        <p class="font-medium text-lg text-primary">
                            {{ toRupiah(product.price) }}
                        </p>
                        <div class="mt-auto flex">
                            <button @click="decrement(product.id)" class="group" :disabled="product.qty <= 1">
                                <svg class="fill-primary group-disabled:fill-primary-200" width="20" height="20"
                                    viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M4.4443 18.3147C6.08879 19.4135 8.02219 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.02219 19.4135 6.08879 18.3147 4.4443C17.2159 2.79981 15.6541 1.51809 13.8268 0.761209C11.9996 0.00433283 9.98891 -0.193701 8.0491 0.192152C6.10929 0.578004 4.32746 1.53041 2.92894 2.92894C1.53041 4.32746 0.578004 6.10929 0.192152 8.0491C-0.1937 9.98891 0.00433283 11.9996 0.761209 13.8268C1.51809 15.6541 2.79981 17.2159 4.4443 18.3147ZM5.55544 3.34825C6.87103 2.4692 8.41775 2 10 2C12.1217 2 14.1566 2.84286 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 11.5823 17.5308 13.129 16.6518 14.4446C15.7727 15.7602 14.5233 16.7855 13.0615 17.391C11.5997 17.9965 9.99113 18.155 8.43928 17.8463C6.88743 17.5376 5.46197 16.7757 4.34315 15.6569C3.22433 14.538 2.4624 13.1126 2.15372 11.5607C1.84504 10.0089 2.00347 8.40035 2.60897 6.93854C3.21447 5.47673 4.23985 4.2273 5.55544 3.34825ZM6 11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9H6C5.73478 9 5.48043 9.10536 5.29289 9.29289C5.10536 9.48043 5 9.73478 5 10C5 10.2652 5.10536 10.5196 5.29289 10.7071C5.48043 10.8946 5.73478 11 6 11Z">
                                    </path>
                                </svg>
                            </button>
                            <input
                                class="border-b-2 bg-transparent w-14 text-center outline-none focus:border-primary-600 duration-300"
                                v-model="product.qty" @input="event => changeQty(product.id, event.target.value)"
                                :id="product.id" />
                            <button @click="increment(product.id)" :disabled="product.qty >= 30000" class="group">
                                <span>
                                    <svg class="group-disabled:fill-primary-200 fill-primary" width="20" height="20"
                                        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M4.4443 18.3147C6.08879 19.4135 8.02219 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.02219 19.4135 6.08879 18.3147 4.4443C17.2159 2.79981 15.6541 1.51809 13.8268 0.761209C11.9996 0.00433283 9.98891 -0.193701 8.0491 0.192152C6.10929 0.578004 4.32746 1.53041 2.92894 2.92894C1.53041 4.32746 0.578004 6.10929 0.192152 8.0491C-0.1937 9.98891 0.00433283 11.9996 0.761209 13.8268C1.51809 15.6541 2.79981 17.2159 4.4443 18.3147ZM5.55544 3.34825C6.87103 2.4692 8.41775 2 10 2C12.1217 2 14.1566 2.84286 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 11.5823 17.5308 13.129 16.6518 14.4446C15.7727 15.7602 14.5233 16.7855 13.0615 17.391C11.5997 17.9965 9.99113 18.155 8.43928 17.8463C6.88743 17.5376 5.46197 16.7757 4.34315 15.6569C3.22433 14.538 2.4624 13.1126 2.15372 11.5607C1.84504 10.0089 2.00347 8.40035 2.60897 6.93854C3.21447 5.47673 4.23985 4.2273 5.55544 3.34825ZM11 9H14C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10C15 10.2652 14.8946 10.5196 14.7071 10.7071C14.5196 10.8946 14.2652 11 14 11H11V14C11 14.2652 10.8946 14.5196 10.7071 14.7071C10.5196 14.8946 10.2652 15 10 15C9.73478 15 9.48043 14.8946 9.29289 14.7071C9.10536 14.5196 9 14.2652 9 14V11H6C5.73478 11 5.48043 10.8946 5.29289 10.7071C5.10536 10.5196 5 10.2652 5 10C5 9.73478 5.10536 9.48043 5.29289 9.29289C5.48043 9.10536 5.73478 9 6 9H9V6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6V9Z">
                                        </path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-[1px] mt-5 rounded-lg" v-else>
                <div class="h-64 flex flex-col items-center justify-center gap-4">
                    <div class="">
                        <img src="/assets/empty_cart.svg" class="w-40" />
                    </div>
                    <p class="font-medium">
                        Keranjang kosong :)
                    </p>
                </div>
            </div>
        </section>
        <section class="flex-1 px-4 md:px-0">
            <div class="border-[1px] rounded-lg p-3 flex flex-col gap-3">
                <p class="font-medium">Ringkasan Belanja</p>
                <div class="h-[1px] bg-gray-300"></div>
                <div class="flex justify-between font-bold">
                    <p>Total belanja</p>
                    <p>{{ toRupiah(grandTotal) }}</p>
                </div>
                <button class="btn">
                    Checkout
                </button>
            </div>
        </section>
    </main>
</template>

<script>
import { toRupiah } from '@/utils/formatter';

export default {
    name: "CartView",
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        grandTotal() {
            return this.$store.getters.cartGrandTotal;
        }
    },
    methods: {
        toRupiah,
        increment(id) {
            this.$store.dispatch('incrementCartQty', { id });
        },
        decrement(id) {
            this.$store.dispatch('decrementCartQty', { id });
        },
        changeQty(id, qty) {
            const qtyInput = parseInt(qty);
            if (!isNaN(qtyInput) && qtyInput > 0) this.$store.dispatch('changeCartQty', { id, qty: qtyInput });
            if (qtyInput > 30000) this.$store.dispatch('changeCartQty', { id, qty: 30000 });
        },
        deleteProductCart(id) {
            this.$store.dispatch('deleteProductCart', { id });
        }
    }
}
</script>