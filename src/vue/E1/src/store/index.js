import { createStore } from 'vuex'

export default createStore({
  state: {
    calendarEvents: [],
    accessToken: null,
    isModalVisible: false,
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
    // Store the isModalOpen state in the store, called from the EventModal component
    setIsModalVisible(state, isModalVisible) {
      state.isModalVisible = isModalVisible;
    }
  },
  getters: {
    getEventById: (state) => (id) => {
      return state.calendarEvents.find(event => event.id === id);
    }
  },
})
