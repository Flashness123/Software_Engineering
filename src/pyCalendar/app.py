import os
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

from flask import Flask, redirect, url_for, render_template, jsonify, session
from flask_dance.contrib.google import make_google_blueprint, google

app = Flask(__name__)
app.secret_key = 'AIzaSyCSEoZIXZoR9SOyNUnAIpMnWStJQRN41Cc' # replace with your secret key
app.config["GOOGLE_OAUTH_CLIENT_ID"] = "966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com" # replace with your client id
app.config["GOOGLE_OAUTH_CLIENT_SECRET"] = "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" # replace with your client secret

google_bp = make_google_blueprint(scope=["https://www.googleapis.com/auth/calendar"])
app.register_blueprint(google_bp, url_prefix="/login")


def fetch_calendar_events():
    if not google.authorized:
        redirect(url_for("google.login"))
        return []
    sync_token = session.get('sync_token')
    if sync_token:
        resp = google.get("/calendar/v3/calendars/primary/events", params={'syncToken': sync_token})
        if resp.status_code == 410:
            # syncToken has expired, clear it and do a full sync
            session.pop('sync_token', None)
            resp = google.get("/calendar/v3/calendars/primary/events")
    else:
        resp = google.get("/calendar/v3/calendars/primary/events")

    assert resp.ok, resp.text
    data = resp.json()
    events = data["items"]
    events = [event for event in events if 'start' in event]

    # Store the new sync token in the session
    session['sync_token'] = data.get('nextSyncToken')

    return events

@app.route("/")
def index():
    events = fetch_calendar_events()
    return render_template('calendar.html', events=events)

@app.route("/fetch_events")
def fetch_events():
    events = fetch_calendar_events()
    return jsonify(events)

if __name__ == "__main__":
    app.run(debug=True)
