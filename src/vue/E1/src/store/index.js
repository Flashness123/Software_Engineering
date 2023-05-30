import { createStore } from 'vuex'

export default createStore({
  state: {
    calendarEvents: [],
  },
  mutations: {
    setCalendarEvents(state, events) {
      state.calendarEvents = events;
    },
  },
})
