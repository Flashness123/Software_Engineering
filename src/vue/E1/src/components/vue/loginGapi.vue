<script>
const CLIENT_ID = '966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCSEoZIXZoR9SOyNUnAIpMnWStJQRN41Cc';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar';
export default {
    data() {
        return {
            authorized: false,
            items: undefined,
        };
    },
    created() {
        this.api = gapi;
        this.handleClientLoad();
    },
    methods: {
        handleClientLoad() {
            this.api.load('client:auth2', this.initClient);
        },
        initClient() {
            let vm = this;
            vm.api.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(_ => {
                vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
            });
        },

        handleAuthClick(event) {
            Promise.resolve(this.api.auth2.getAuthInstance().signIn())
                .then(_ => {
                    this.authorized = true;
                });
        },
        handleSignOutClick(event) {
            Promise.resolve(this.api.auth2.getAuthInstance().signOut())
                .then(_ => {
                    this.authorized = false;
                });
        },
        getEvents() {
            let vm = this;
            vm.api.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (moment(this.filters.start).format('YYYY-MM-DDTHH:mm:ss.SZ')),
                'timeMax': (moment(this.filters.end).format('YYYY-MM-DDTHH:mm:ss.SZ')),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
            }).then(response => {
                this.items = response.result.items;
            });
        },
    },
    mounted() {
        // this.loadScripts();
        // this.loadSession();
    }
};
</script>

<template>
    <div id="login">
        <button type="button" class="btn btn-primary" if='!authorized' @click="handleAuthClick">Login</button>
        <button type="button" class="btn btn-primary" v-if='authorized' @click="handleSignOutClick">Sign Out</button>
        <button type="button" class="btn btn-primary" v-if='authorized' @click="getEvents">Get Events</button>
    </div>
</template>
  

  