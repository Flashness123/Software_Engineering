<template>
    <div>
        <input type="text" v-model="searchQuery" @input="searchEventsFromQuery" placeholder="Search events..." />
        <!-- Add search button -->
        <button @click="searchEventsFromQuery">Search</button>
    </div>
</template>

<script>
import { ref } from 'vue';
import { searchEvents } from '../services/searchEvents';
import store from '../store/index.js';

export default {
    setup() {
        const searchQuery = ref('');

        let debounceTimeout = null;

        const searchEventsFromQuery = async () => {
            clearTimeout(debounceTimeout);  // clear the timer if it's still running
            debounceTimeout = setTimeout(async () => {  // start a new timer
                if (searchQuery.value.length > 0) {
                    const results = await searchEvents(store.state.accessToken, searchQuery.value);
                    console.log(results);
                }
            }, 250);  // delay of 250ms
        }
        return {
            searchQuery,
            searchEventsFromQuery,
        };
    },
};
</script>
