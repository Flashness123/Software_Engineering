
/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCSEoZIXZoR9SOyNUnAIpMnWStJQRN41Cc';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest', 'https://people.googleapis.com/$discovery/rest?version=v1'];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

let tokenClient;
let gapiInited = false;
let gisInited = false;

//document.getElementById('authorize_button').style.visibility = 'hidden';
//document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client:auth2', initializeGapiClient); console.log("gapi loaded");
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDoc: [DISCOVERY_DOC],
    });
    console.log("gapi initiated");
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

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

/**
 *  Sign in the user upon button click.
 */
async function handleAuthClick() {
    const auth2 = gapi.auth2.getAuthInstance();

    if (auth2.isSignedIn.get()) {
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Refresh';

        const email = auth2.currentUser.get().getBasicProfile().getEmail();
        console.log(email);
        NewPage();
    } else {
        auth2.signIn().then(async () => {
            document.getElementById('signout_button').style.visibility = 'visible';
            document.getElementById('authorize_button').innerText = 'Refresh';

            const email = auth2.currentUser.get().getBasicProfile().getEmail();
            console.log(email);
            NewPage();
        });
    }
}



function NewPage() {
    window.location.href = "index2.html";
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');

        /*document.getElementById('content').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';*/
    }
    window.location.href = "index.html";
}


