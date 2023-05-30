<!--This is the login component, which is used to sign in to Google
// Author: Jamal Alkharrat
// https://vue3-google-signin.syetalabs.io/composables/use-token-client.html -->

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
  console.log("Access Token: ", response.access_token);
  store.commit('setAccessToken', response.access_token); // commit access token to store, so we can use it later
  // Start date is 4 weeks ago
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 28);
  // End date is 4 weeks from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 28);
  const events = await fetchEvents(response.access_token, startDate, endDate); // fetch events after login, so we can display them
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