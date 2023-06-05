/**
 * Author: Jamal Alkharrat - s82035@htw-dresden.de
 * 
 * Creates a store for the app using Vuex, a state management library for Vue.js
 * The store is used to store the calendar events and the access token
 * 
 * for more info, see the Vuex docs:
 * https://vuex.vuejs.org/
 */

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
    },
    // Add an event to the store
    addEvent(state, event) {
      state.calendarEvents.push(event);
    },
    // remove an event from the store
    removeEvent(state, eventId) {
      state.calendarEvents = state.calendarEvents.filter(event => event.id !== eventId);
    },
  },
  getters: {
    getEventById: (state) => (id) => {
      return state.calendarEvents.find(event => event.id === id);
    }
  },
})
