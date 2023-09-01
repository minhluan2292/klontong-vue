<template>
    <main class="flex max-w-7xl mx-auto pt-24 gap-8">
        <div class="flex-1">
            <div class=" border-[1px] rounded-lg p-3 select-none mt-16">
                <h1 class='font-medium'>Search</h1>
                <input class="w-full my-3 p-1 border-[1px] rounded-lg" />

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
        <div class="flex-[3_3_0%] bg-blue">
            <div class="h-16 flex justify-between items-center">
                <p>Showing <b>2</b> results (1-10) from 2</p>
                <div class="flex gap-x-2 items-center">
                    <div>
                        <select class="border-2 rounded-md px-2 py-1 text-sm">
                            <option>Sort By</option>
                            <option>Sort Bysssssss</option>
                            <option>Sort Byssssssss</option>
                        </select>

                    </div>
                    <button class="btn">Go</button>
                </div>
            </div>
            <div v-if="products.length > 0" class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-4">
                <a href="/product/1" class="border-[1px] rounded-xl flex flex-col" v-for="product in products"
                    :key="product" title="KitKat 150gr">
                    <div class=" ">
                        <img src="https://s3.bukalapak.com/img/31437933103/s-463-463/data.png.webp" class="rounded-t-xl" />
                    </div>
                    <div class="p-3 rounded-b-xl border-t-[1px]">
                        <p class="font-semibold">KitKat 150gr</p>
                        <p class="text-sm">IDR 15.000</p>
                    </div>
                </a>

            </div>
        </div>
    </main>
</template>


<script>
// @ is an alias to /src

export default {
    name: 'ProductView',
    data: function () {
        return {

            products: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '7', '6', '5', '5',]



        }
    }
}
</script>
