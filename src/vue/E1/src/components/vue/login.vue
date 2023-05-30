<!--This is the login component, which is used to sign in to Google
// Author: Jamal Alkharrat
// https://vue3-google-signin.syetalabs.io/composables/use-token-client.html -->

<script setup lang="ts">
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
import store from '../../store/index.js';

// This function uses the access token to fetch the user's calendar events
const fetchCalendarEvents = async (accessToken) => {
  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  console.log(data.items); // data.items contains the user's calendar events
  // Transform Google Calendar events into FullCalendar events
  // Check if there are any items in the response data
  if (data.items) {
    const events = data.items.map(item => {
      if (item.start && item.end) { // Check if item.start and item.end are defined
        return {
          title: item.summary,
          start: item.start.dateTime || item.start.date, // handle both datetime and all-day events
          end: item.end.dateTime || item.end.date,
          allDay: !!item.start.date, // if the event has a start.date property, it is an all-day event
        }
      }
    }).filter(Boolean); // Remove undefined items
    console.log(events);
    store.commit('setCalendarEvents', events);
  };
}
  // This function is called when the user successfully signs in, and the access token is returned
  const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
    console.log("Access Token: ", response.access_token);
    fetchCalendarEvents(response.access_token); // 
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