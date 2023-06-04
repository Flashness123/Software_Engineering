<!-- 
* Author: Jamal Alkharrat - s82035@htw-dresden.de
*
* This is the fullcalendar component, which is used to display the calendar
* Also, it is used to display the modal, which is used to display event details and to edit or delete events
*
* For more information on how to use the fullcalendar component, see here:
* https://fullcalendar.io/docs/vue
 -->
<template>
  <div id="fullcalendar_popup">
    <FullCalendar :options="calendarOptions" ref="fullCalendar" />
    <modal :event="selectedEvent"/>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { nextTick, watch, ref } from 'vue';
import store from '../store/index.js';
import { fetchEvents } from '../services/fetchEvents.js';
import Modal from './modal.vue'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    Modal
  },
  data() {
    return {
      calendarApi: null, // a reference to the FullCalendar instance
      selectedEvent: null,
      isModalVisible: false,
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
          if (store.state.accessToken) {
            const events = await fetchEvents(store.state.accessToken, start, end);
          }
        },
        eventClick: (info) => {
          this.selectedEvent = store.getters.getEventById(info.event._def.publicId);
          if (store.state.isModalVisible === false) {
            this.isModalVisible = true;
            store.commit('setIsModalVisible', this.isModalVisible);
          }
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