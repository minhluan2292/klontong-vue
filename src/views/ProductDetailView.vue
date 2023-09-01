<template>
    <main class="flex max-w-7xl mx-auto pt-24 gap-8">
        <div class="flex-[2_2_0%]">
            <div class="border-2">
                <img src="https://s3.bukalapak.com/img/31437933103/s-463-463/data.png.webp" />
            </div>

        </div>
        <div class="flex-[4_4_0%] bg-blue space-y-3">
            <h1 class="text-xl font-semibold">KitKat 50gr</h1>
            <h2 class="text-2xl font-bold">Rp50.000</h2>
            <div>
                <span class="p-1 bg-primary-400 text-white text-xs rounded-md font-medium">
                    Snacks
                </span>
            </div>

            <div>
                <p><span class="text-gray-500">Dimension:</span> 10x10x10</p>
                <p><span class="text-gray-500">Berat:</span> 69gr</p>
                <p>Roti manis yang lembut berisi Cokelat dari Sari Roti. Enak, mengenyangkan, dan praktis. Bisa untuk
                    camilan dan teman beraktivitas.</p>
            </div>
        </div>
        <div class="flex-[2_2_0%]">
            <div class="border-2 px-3 py-5 flex flex-col space-y-3 rounded-lg">
                <p class="text-lg font-medium">Atur jumlah</p>
                <div class="border-[1px] rounded-lg flex justify-center items-center gap-2 px-2 py-1 max-w-xs">
                    <button class="flex items-center">
                        <svg class="fill-primary-600" viewBox="0 0 24 24" width="16px" height="16px"
                            style="display: inline-block; vertical-align: middle;">
                            <path d="M20 12.75H4a.75.75 0 110-1.5h16a.75.75 0 110 1.5z"></path>
                        </svg>
                    </button>
                    <input class="outline-none text-center" value="0" />
                    <button class="flex items-center">
                        <svg class="fill-primary" viewBox="0 0 24 24" width="16px" height="16px"
                            style="display: inline-block; vertical-align: middle;">
                            <path
                                d="M20 11.25h-7.25V4a.75.75 0 10-1.5 0v7.25H4a.75.75 0 100 1.5h7.25V20a.75.75 0 101.5 0v-7.25H20a.75.75 0 100-1.5z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div class="flex justify-between">
                    <p class="text-gray-500">Subtotal</p>
                    <p class="text-lg font-semibold">Rp6.000</p>
                </div>
                <button class="btn">+ Keranjang</button>
            </div>
        </div>
    </main>
</template>


<script>
// @ is an alias to /src

export default {
    name: 'ProductDetailView',
    data: function () {
        return {

            products: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '7', '6', '5', '5',]



        }
    }
}
</script>
