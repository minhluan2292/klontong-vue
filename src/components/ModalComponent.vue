<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-[100] bg-black/90" @click="onClose">
        <div class="modal-container" :class="{ opacity: isOpen, }" @click.stop>
            <div class="modal-content">
                <!-- Modal content goes here -->
                <slot></slot>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        isOpen: Boolean,
        onClose: Function
    },
};
</script>
  
<style scoped>
/* Add your modal styles here */
.modal-container {
    transition: opacity 0.3s ease-in-out;
    @apply w-72 h-40 bg-white p-3 rounded-lg flex;
}

.modal-content {
    /* Add your content styles here */
}

.fixed.inset-0 {
    /* Add styles for the overlay/background here */
}
</style>
  