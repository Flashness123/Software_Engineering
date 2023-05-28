
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
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

// document.getElementById('authorize_button').style.visibility = 'hidden';
// document.getElementById('signed_in').style.visibility = 'hidden';

window.onload = () => {
    loadSession();
};

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
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
    gapiInited = true;
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
 * Enables user interaction after all libraries are loaded and the API client is initialized.
 * Access token is null if the user is not signed in.
 */
function maybeEnableButtons() {
    const token = {
        access_token: localStorage.getItem('access_token'),
        token_type: localStorage.getItem('token_type'),
        expires_in: localStorage.getItem('expires_in'),
        // Add other relevant data here
    };
    if (gapiInited && gisInited && token.access_token !== null) {
        document.getElementById('authorize_button').style.visibility = 'hidden';
        const e = new CustomEvent('renderEvents');
        document.dispatchEvent(e);
    } else if (gapiInited && gisInited && token.access_token === null) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

//Sign in the user upon button click.
async function handleAuthClick() {
    tokenClient.callback = async (resp) => { // tokenClient.callback is called when the user finishes the OAuth flow.
        if (resp.error !== undefined) {
            throw (resp);
        }
        saveSession(resp);
        document.getElementById('authorize_button').style.visibility = 'hidden';
        document.getElementById('signed_in').style.visibility = 'visible';
        // Add other actions to handle the session here
        const event = new CustomEvent('loginSuccess');
        document.dispatchEvent(event);
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
        document.getElementById('authorize_button').style.visibility = 'visible';
        document.getElementById('signed_in').style.visibility = 'hidden';
    }
}

// Save the session state to the local storage.
function saveSession(token) {
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('token_type', token.token_type);
    localStorage.setItem('expires_in', token.expires_in);
    localStorage.setItem('timestamp', Date.now());  // Save the current timestamp
    // Add other relevant data here
}

// Load the session state from the local storage.
function loadSession() {

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
            document.getElementById('authorize_button').style.visibility = 'hidden';
            document.getElementById('signed_in').style.visibility = 'visible';
            const event = new CustomEvent('loginSuccess'); // Notify the app that the session has been restored
            document.dispatchEvent(event);
        } else {
            // The token has expired, clear the session
            localStorage.clear();
            document.getElementById('authorize_button').style.visibility = 'visible';
            document.getElementById('signed_in').style.visibility = 'hidden';
        }
    }

}

function showCalendar(){
    document.getElementById('authorize_button').style.visibility = 'hidden';
    console.log('Authorize hidden')
    document.getElementById('signed_in').style.visibility = 'visible';
    console.log('Calendar visible')
}

function hideCalendar(){
    document.getElementById('authorize_button').style.visibility = 'visible';
    console.log('Authorize visible')
    document.getElementById('signed_in').style.visibility = 'hidden';
    console.log('Calendar hidden')
}