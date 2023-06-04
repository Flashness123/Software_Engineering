<!-- 
* Author: Jamal Alkharrat - s82035@htw-dresden.de
*
* This is the createEventElement component, which is used to create events in Google Calendar
*
 -->
<template>
    <div>
        <button @click="showModal()">Create event</button>
        <dialog ref="createEventModal">
            <div>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" v-model="event.title" required>
                </div>
                <div>
                    <label for="start">Start:</label>
                    <input type="datetime-local" id="start" v-model="event.start" :placeholder="currentDateTime" required>
                </div>
                <div>
                    <label for="end">End:</label>
                    <input type="datetime-local" id="end" v-model="event.end" :placeholder="currentDateTime" required>
                </div>
                <div>
                    <button type="submit" :disabled="!isFormValid()" @click="createEventClick()">Submit</button>
                    <button type="button" @click="closeModal()">Close</button>
                </div>
            </div>
        </dialog>
    </div>
</template>
  
<script>
import { ref, computed, watch } from 'vue';
import { createEvent } from '../services/createEvent';
import store from '../store/index.js';

export default {
    setup() {
        const createEventModal = ref(null);
        const event = ref({
            title: '',
            start: '',
            end: '',
        });

        const createEventClick = () => {
            if (isFormValid()) {
                createEvent(store.state.accessToken, event.value);
                createEventModal.value.close();
            }
        }

        const showModal = () => {
            createEventModal.value.showModal();
        }

        const closeModal = () => {
            createEventModal.value.close();
        }

        const isFormValid = () => {
            if (event.value.title && event.value.start && event.value.end) {
                return true;
            } else {
                return false;
            }
        };

        const currentDateTime = computed(() => {
            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero based
            const dd = String(now.getDate()).padStart(2, '0');
            const hh = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');

            return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
        });

        return {
            createEventModal,
            event,
            currentDateTime,
            createEventClick,
            isFormValid,
            showModal,
            closeModal,
        };
    },
};
</script>
  