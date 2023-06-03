<template>
  <div id="fullcalendar_popup">
    <FullCalendar :options="calendarOptions" ref="fullCalendar" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { nextTick, watch, ref } from 'vue';
import store from '../store/store.js';
import { fetchEvents } from '../services/fetchEvents.js';
import eventDialog from './eventPopup.vue';

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    EventPopup
  },
  data() {
    return {
      calendarApi: null, // a reference to the FullCalendar instance
      showPopup: false,
      selectedEvent: null,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        height: "auto",
        selectable: true,
        events: [],
        datesSet: async function (info) {
          const start = info.startStr; // The start date of the current view
          const end = info.endStr; // The end date of the current view
          // Call a method to fetch events for this date range
          const events = await fetchEvents(store.state.accessToken, start, end);
          store.commit('setCalendarEvents', events); // commit events to store
        },
        eventClick(info) {
          console.log(info);
          this.selectedEvent = info.event._def;
          console.log(this.selectedEvent);
          this.showPopup = true;
          console.log(this.showPopup);
        }
      }
    }
  },
  methods: {
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
          if (oldEvents) {
            oldEvents.forEach(event => {
              const existingEvent = this.calendarApi.getEventById(event.id);
              if (existingEvent) {
                existingEvent.remove();
              }
            });
          }
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
