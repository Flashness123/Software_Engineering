<!--  
  Author: Jamal Alkharrat
  This is the login component, which is used to sign in to Google
  It uses the useTokenClient composable function, which is defined here:
  https://vue3-google-signin.syetalabs.io/composables/use-token-client.html 
-->

<script setup lang="ts">
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
import store from '../store/index.js';
import { fetchEvents } from '../services/fetchEvents.js';

// This function is called when the user successfully signs in, and the access token is returned
const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
  // commit access token to store, so we can use it later
  console.log("Access Token: ", response.access_token);
  store.commit('setAccessToken', response.access_token); 

  // Display the events from Google Calendar after login

  // Start date is 8 weeks ago
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 56);
  // End date is 8 weeks from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 56);
  // Fetch events from Google Calendar, using the access token and the start and end dates as ISO strings
  const events = await fetchEvents(response.access_token, startDate.toISOString(), endDate.toISOString());
  // Commit the events to the store, so we can display them in the calendar
  store.commit('setCalendarEvents', events);
};

// This function is called when the user fails to sign in, or if there is an error
const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

// This function is called when the user clicks the login button
const { isReady, login } = useTokenClient({ // useTokenClient is a composable function
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  scope: 'https://www.googleapis.com/auth/calendar',
});
</script>

<template>
  <button id="auth_button" :disabled="!isReady" @click="() => login()">Login with Google</button>
</template>