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
  const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) =>{
    console.log("Access Token: ", response.access_token);
    const events = await fetchEvents(response.access_token, '2023-01-01', '2023-12-31'); // test fetchEvents function with 2023 dates
    store.commit('setCalendarEvents', events); // commit events to store
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