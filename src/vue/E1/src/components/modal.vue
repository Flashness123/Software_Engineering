<template>
    <dialog ref="modal">
        <!-- display event info -->
        <div>
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="eventCopy.title" required>
            </div>
            <div>
                <label for="start">Start:</label>
                <input type="datetime-local" id="start" v-model="eventCopy.start" required>
            </div>
            <div>
                <label for="end">End:</label>
                <input type="datetime-local" id="end" v-model="eventCopy.end" required>
            </div>
            <div>
                <button @click="updateEventClick()">Update</button>
                <button @click="deleteEventClick()">Delete</button>
                <!-- Add close button -->
                <button @click="closeModal()">Close</button>
            </div>
        </div>
    </dialog>
</template>
  

<script>
// https://stackoverflow.com/questions/71741758/using-queryselector-in-vue-compostion-api
// https://blog.webdevsimplified.com/2023-04/html-dialog/

import { ref, watch, watchEffect } from 'vue'
import store from '../store/index.js'
import { deleteEvent } from '../services/deleteEvent.js'
import { updateEvent } from '../services/updateEvent.js'


export default {
    // receive the event prop from parent (fullcalendar.vue)
    props: {
        event: Object // receive the event prop from parent (fullcalendar.vue)
    },
    data() {
        return {
            eventCopy: {
                id: '',
                title: '',
                start: '',
                end: '',
                allDay: '',
            },
        }
    },
    setup(props) {
        // create a ref to the modal, so we can access it
        const modal = ref(null)
        // create a copy of the event, so we can edit it
        const eventCopy = ref(props.event)
        watchEffect(() => {
            eventCopy.value = {
                ...props.event, 
            };
        });

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
        // create a method to delete the event
        const deleteEventClick = () => {
            // delete the event
            if (store.state.accessToken) {
                console.log("delete event" + props.event.id)
                deleteEvent(store.state.accessToken, props.event.id)
            }
            // close the modal
            closeModal()
        }
        const updateEventClick = () => {
            if (store.state.accessToken) {
                console.log(eventCopy.value)
                console.log("update event" + props.event.id)
                updateEvent(store.state.accessToken, props.event.id, eventCopy.value)
            }
            closeModal()
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
            eventCopy,
            showModal,
            closeModal,
            deleteEventClick,
            updateEventClick,
        }
    },
}
</script>