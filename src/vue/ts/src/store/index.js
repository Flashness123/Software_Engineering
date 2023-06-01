import { createStore } from 'vuex'

export default createStore({
  state: {
    calendarEvents: [],
    accessToken: null,
  },
  mutations: {
    // Store the calendar events in the store
    setCalendarEvents(state, events) {
      state.calendarEvents = events;
    },
    // Store the access token in the store, called from the GoogleSignInButton component
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
  },
})
