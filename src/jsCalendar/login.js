// export { userEmail };

/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCSEoZIXZoR9SOyNUnAIpMnWStJQRN41Cc';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;
const userEmail = "";

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
console.log("Gapi Loaded");
gapi.load('client:auth2', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
});
await gapi.auth2.init({
    client_id: CLIENT_ID,
    scope: SCOPES,
});
gapiInited = true;
console.log("gapi initiated");
maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
});
gisInited = true;
maybeEnableButtons();
}

/*
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
}
}


function NewSite() {
    window.location.replace("index2.html")
}


function handleAuthClick() {
tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
    throw (resp);
    }
    userEmail = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
    NewSite();
};

if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
} else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});}
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
const token = gapi.client.getToken();
if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');

/*
    document.getElementById('content').innerText = '';
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';*/
}
window.location.replace("index.html");
}

