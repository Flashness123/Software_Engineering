import os
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

from flask import Flask, redirect, url_for, render_template
from flask_dance.contrib.google import make_google_blueprint, google

app = Flask(__name__)
app.secret_key = 'AIzaSyCSEoZIXZoR9SOyNUnAIpMnWStJQRN41Cc' # replace with your secret key
app.config["GOOGLE_OAUTH_CLIENT_ID"] = "966425262226-nflro5si4ftpk7c3c4hq57ngrcr70hsn.apps.googleusercontent.com" # replace with your client id
app.config["GOOGLE_OAUTH_CLIENT_SECRET"] = "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" # replace with your client secret

google_bp = make_google_blueprint(scope=["https://www.googleapis.com/auth/calendar.readonly"])
app.register_blueprint(google_bp, url_prefix="/login")

@app.route("/")
def index():
    if not google.authorized:
        return redirect(url_for("google.login"))
    resp = google.get("/calendar/v3/calendars/primary/events")
    assert resp.ok, resp.text
    events = resp.json()["items"]
    events = [event for event in events if 'start' in event]
    

    return render_template('calendar.html', events=events)

if __name__ == "__main__":
    app.run(debug=True)
