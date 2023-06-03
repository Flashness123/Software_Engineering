<template>
    <div>
        <input type="text" v-model="searchQuery" @input="searchEventsOnInput" placeholder="Search events..." />
        <!-- Add search button -->
        <button @click="searchEventsClick">Search</button>
    </div>
</template>

<script>
import { ref } from 'vue';
import { searchEvents } from '../services/searchEvents';
import store from '../store/index.js';

export default {
    setup() {
        const searchQuery = ref('');

        const searchEventsClick = async () => {
            if (searchQuery.value.length > 0) {
                const results = await searchEvents(store.state.accessToken, searchQuery.value);
                console.log(results);
            }
        };
        const searchEventsOnInput = async () => {
            if (searchQuery.value.length > 0) {
                const results = await searchEvents(store.state.accessToken, searchQuery.value);
                console.log(results);
            }
        };
        return {
            searchQuery,
            searchEventsClick,
            searchEventsOnInput,
        };
    },
};
</script>
