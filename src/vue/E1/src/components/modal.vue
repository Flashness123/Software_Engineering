<template>
    <!-- Add open dialog button -->
    <!-- <button @click="modal.showModal()">Open</button> -->
    <!-- if showModal is true then show modal -->
    <dialog ref="modal">
        <!-- Add close button -->
        <button @click="modal.close()">Close</button>
    </dialog>
</template>

<script>
// https://stackoverflow.com/questions/71741758/using-queryselector-in-vue-compostion-api
// https://blog.webdevsimplified.com/2023-04/html-dialog/

import { ref, onMounted } from 'vue'

const modal = ref(null)
export default {
    props : {
        showModal : Boolean
    },
    methods : {
        showModal() {
            if (showModal == true) {
                modal.showModal()
            }
            showModal = false
        },
    },
}
</script>