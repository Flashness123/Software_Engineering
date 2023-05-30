<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { nextTick, watch } from 'vue';
import store from '../../store/index.js';

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarApi: null, // a reference to the FullCalendar instance
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        height: "auto",
        events: []
      }
    }
  },
  mounted() {
    // After the component is mounted, save a reference to the FullCalendar instance
    nextTick(() => {
      this.calendarApi = this.$refs.fullCalendar.getApi();
    });
  },
  created() {
    // When the component is created, set up a watcher on store.state.calendarEvents
    watch(
      () => store.state.calendarEvents, // watch this computed property
      (newEvents, oldEvents) => {
        // When the events change, update them on the FullCalendar instance
        if (this.calendarApi) {
          // Remove old events
          oldEvents.forEach(event => {
            const existingEvent = this.calendarApi.getEventById(event.id);
            if (existingEvent) {
              existingEvent.remove();
            }
          });
          // Add new events
          newEvents.forEach(event => {
            this.calendarApi.addEvent(event);
          });
        }
      },
      { deep: true } // because events is an array of objects, we need to watch it deeply
    );
  }
}
</script>
<template>
  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
</template>