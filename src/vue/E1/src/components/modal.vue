<template>
    <!-- Add open dialog button -->
    <!-- <button @click="modal.showModal()">Open</button> -->
    <!-- if showModal is true then show modal -->
    <dialog ref="modal">
        <!-- display event info -->
        <pre>{{ event }}</pre>
        <!-- Add close button -->
        <button @click="closeModal()">Close</button>
    </dialog>
</template>

<script>
// https://stackoverflow.com/questions/71741758/using-queryselector-in-vue-compostion-api
// https://blog.webdevsimplified.com/2023-04/html-dialog/

import { ref, watch } from 'vue'


export default {
    props: {
        isModalVisible: Boolean,
        event: Object // receive the event prop from parent (fullcalendar.vue)
    },
    setup(props) {
        const modal = ref(null)

        const showModal = () => {
            if (props.isModalVisible) {
                modal.value.showModal()
            }
        }
        const closeModal = () => {
            modal.value.close()
        }
        watch(() => props.isModalVisible, (newVal) => {
            if (newVal) {
                showModal()
            } else {
                closeModal()
            }
        })
        return {
            modal,
            showModal,
            closeModal
        }
    }
}
</script>