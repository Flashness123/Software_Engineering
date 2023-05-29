<script>
export default {
    data() {
        return {
            gapi: null,
            tokenClient: null,
            token: null,
            CLIENT_ID: '966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com',
            API_KEY: 'AIzaSyCSEoZIXZoR9SOyNUnAIpMnWStJQRN41Cc',
            DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            SCOPES: 'https://www.googleapis.com/auth/calendar',
            gapiInited: false,
            gisInited: false,
        };
    },
    methods: {

        /**
         * Callback after api.js is loaded.
         */
        gapiLoaded() {
            console.log('gapiLoaded');
            this.gapi = gapi.load('client', this.initializeGapiClient);
            console.log('gapiLoaded', this.gapi);
        },
        loadScripts() {
            let script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.async = true;
            script.defer = true;
            script.onload = this.gapiLoaded;
            document.body.appendChild(script);

            let script2 = document.createElement('script');
            script2.src = 'https://accounts.google.com/gsi/client';
            script2.async = true;
            script2.defer = true;
            script2.onload = this.gisLoaded;
            document.body.appendChild(script2);
        },

        /**
         * Callback after the API client is loaded. Loads the
         * discovery doc to initialize the API.
         */
        async initializeGapiClient() {
            await this.gapi.client.init({
                apiKey: this.API_KEY,
                discoveryDocs: [this.DISCOVERY_DOC],
            });
            this.gapiInited = true;
            this.checkSignedIn();
        },

        /**
         * Callback after Google Identity Services are loaded.
         */
        gisLoaded() {
            this.tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: this.CLIENT_ID,
                scope: this.SCOPES,
                callback: '', // defined later
            });
            this.gisInited = true;
            this.checkSignedIn();
        },

        /* 
         * check if Google Identity Services and Google API Client are loaded and if the user is signed in 
         */
        checkSignedIn() {
            this.token = { // get the access token from the session
                access_token: localStorage.getItem('access_token'),
                token_type: localStorage.getItem('token_type'),
                expires_in: localStorage.getItem('expires_in'),
            };
            /* If the user is signed in, hide the sign-in button and render the events in the calendar. */
            if (this.gapiInited && this.gisInited && this.token.access_token !== null) {
                // document.getElementById('authorize_button').style.visibility = 'hidden';
                // const e = new CustomEvent('renderEvents');
                // document.dispatchEvent(e);
                /* If the user is not signed in, display the sign-in button. */
            } else if (this.gapiInited && this.gisInited && this.token.access_token === null) {
                // document.getElementById('authorize_button').style.visibility = 'visible';
            }
        },

        // Sign in the user upon button click.
        handleAuthClick() {
            tokenClient.callback = async (resp) => { // tokenClient.callback is called when the user finishes the OAuth flow.
                if (resp.error !== undefined) {
                    throw (resp);
                }
                saveSession(resp);
                showCalendar();
                // Add other actions to handle the session here
                const event = new CustomEvent('loginSuccess');
                document.dispatchEvent(event);
            };

            if (gapi.client.getToken() === null) {
                // Prompt the user to select a Google Account and ask for consent to share their data
                // when establishing a new session.
                tokenClient.requestAccessToken({ prompt: 'consent' });
            } else {
                // Skip display of account chooser and consent dialog for an existing session.
                tokenClient.requestAccessToken({ prompt: '' });
            }
        },

        /**
         *  Sign out the user upon button click.
         */
        handleSignoutClick() {
            const token = gapi.client.getToken();
            if (token !== null) {
                google.accounts.oauth2.revoke(token.access_token);
                gapi.client.setToken('');
                hideCalendar();
            }
        },

        // Save the session state to the local storage.
        saveSession(token) {
            localStorage.setItem('access_token', token.access_token);
            localStorage.setItem('token_type', token.token_type);
            localStorage.setItem('expires_in', token.expires_in);
            localStorage.setItem('timestamp', Date.now());  // Save the current timestamp
            // Add other relevant data here
        },

        // Load the session state from the local storage.
        loadSession() {

            const token = {
                access_token: localStorage.getItem('access_token'),
                token_type: localStorage.getItem('token_type'),
                expires_in: localStorage.getItem('expires_in'),
                // Add other relevant data here
            };

            const savedTimestamp = localStorage.getItem('timestamp');
            const currentTimestamp = Date.now();

            // Check if the token has expired
            if (token.access_token !== null && token.expires_in !== null && savedTimestamp !== null) {
                if (currentTimestamp - savedTimestamp < token.expires_in * 1000) {
                    // The token is valid, so we can use it
                    gapi.client.setToken(token); // Restore the saved token
                    showCalendar();
                    const event = new CustomEvent('loginSuccess'); // Notify the app that the session has been restored
                    document.dispatchEvent(event);
                } else {
                    // The token has expired, clear the session
                    localStorage.clear();
                    hideCalendar();
                }
            }

        },

        // Show or hide the calendar
        showCalendar() {
            document.getElementById('authorize_button').style.visibility = 'hidden';
            document.getElementById('signed_in').style.visibility = 'visible';
            document.getElementById('signout_button').style.visibility = 'visible';
        },

        hideCalendar() {
            document.getElementById('authorize_button').style.visibility = 'visible';
            document.getElementById('signed_in').style.visibility = 'hidden';
            document.getElementById('signout_button').style.visibility = 'hidden';
        }
    },
    mounted() {
        this.loadScripts();
        this.loadSession();
    }
};
</script>

<template>
    <div>
        <!--Buttons for Google Login Process-->
        <button id="authorize_button" type="button" class="btn btn-primary" style="position: absolute; right: 0;"
            @click="handleAuthClick">
            Login
        </button>
        <button id="signout_button" type="button" class="btn btn-primary"
            style="position: absolute; right: 0; visibility: hidden;" @click="handleSignoutClick">
            Logout
        </button>
    </div>
</template>
  

  