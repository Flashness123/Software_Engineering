<template>
    <!-- if showModal is true then show modal -->
    <dialog ref="modal">
        <!-- display event info -->
        <pre>{{ event }}</pre>
        <!-- Add button to delete the event and close the modal -->
        <button @click="deleteEventClick()">Delete</button>
        <!-- Add close button -->
        <button @click="closeModal()">Close</button>
    </dialog>
</template>

<script>
// https://stackoverflow.com/questions/71741758/using-queryselector-in-vue-compostion-api
// https://blog.webdevsimplified.com/2023-04/html-dialog/

import { ref, watch } from 'vue'
import store from '../store/index.js'


export default {
    // receive the event prop from parent (fullcalendar.vue)
    props: {
        event: Object // receive the event prop from parent (fullcalendar.vue)
    },
    setup(props) {
        // create a ref to the modal, so we can access it
        const modal = ref(null)
        // create a method to show the modal
        const showModal = () => {
            if (store.state.isModalVisible === true) {
                modal.value.showModal();     
            }
        }
        // create a method to close the modal
        const closeModal = () => {
            modal.value.close()
            store.commit('setIsModalVisible', false);
        }
        // watch the isModalVisible in store, and show or close the modal accordingly
        watch(() => store.state.isModalVisible, (newVal) => {
            if (newVal) {
                showModal()
            } else {
                closeModal()
            }
        })
        // return the modal, and the methods to show and close it, so we can use them in the parent
        return {
            modal,
            showModal,
            closeModal
        }
    }
}
</script>