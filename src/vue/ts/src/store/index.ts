import { createStore } from 'vuex'

interface State {
  calendarEvents: any[]; // You can replace any with the actual type of calendarEvents
  accessToken: string | null;
}

export default createStore<State>({
  state: {
    calendarEvents: [],
    accessToken: null,
  },
  mutations: {
    // Store the calendar events in the store
    setCalendarEvents(state, events: any[]) { // Replace any[] with the actual type of events
      state.calendarEvents = events;
    },
    // Store the access token in the store, called from the GoogleSignInButton component
    setAccessToken(state, accessToken: string) {
      state.accessToken = accessToken;
    },
  },
});
