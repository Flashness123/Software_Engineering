<script setup lang="ts">
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  console.log("Access Token: ", response.access_token);
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});
</script>

<template>
  <button id="auth_button" :disabled="!isReady" @click="() => login()">Login with Google</button>
</template>