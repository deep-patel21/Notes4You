from flask import Flask, jsonify, request, url_for, redirect, session, render_template
#from flask_cors import CORS
from  spotipy.oauth2 import SpotifyOAuth
import spotipy

import time

#Initate Flask application
#Implemented Cross-Origin Resource Sharing 
app  = Flask(__name__)
#CORS(app)

app.secret_key = "placeholder"
app.config["SESSION_COOKIE_NAME"] = "notes4you-login-session"

TOKEN_INFO = "token_info"
PLAYLIST_ID = "https://open.spotify.com/playlist/placeholder"

#Endpoint Usage: fetches authorization_url from Spotify
#Parameters Returned: Throws redirect for user to authorize on Spotify servers
@app.route("/")
def login():
    sp_oauth = create_spotify_oauth()
    authorization_url = sp_oauth.get_authorize_url()
    print(authorization_url)
    redirect(authorization_url)
    return render_template('index.html')

#Endpoint Usage: User to Spotify server
#                Spotify server to redirect_uri at http://localhost:5000/redirect/
#                                                  http://localhost:5000/redirect
#                                                  http://127.0.0.1:5000/redirect/
#                                                  http://127.0.0.1:5000/redirect
#Parameters Returned: Throws redirect to /getTrack endpoint
@app.route('/redirect')
def redirectPage():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get("code")
    token_info = sp_oauth.get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect("/getTrack")

def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        raise "exception"
    current_time = int(time.time())
    is_expired = (token_info["expires_at"] - current_time) < 60
    if is_expired:
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info["refresh_token"])
    return token_info

#Endpoint Usage: Internal
#Parameters Returned: In-built CSS formatted display string containing 
#                      track_name, artist(s), and cover image of track
@app.route('/getTrack', methods=['POST', 'GET'])
def getTrack():
    try:
        token_info = get_token()
    except:
        print("user not logged in yet")
        return redirect("/")
    sp = spotipy.Spotify(auth = token_info["access_token"])
    results = sp.playlist_tracks(PLAYLIST_ID, limit = 10)

    tracks_info = []
    for track in results["items"]:
        track_name = track["track"]["name"]
        artists = [artist["name"] for artist in track["track"]["artists"]]
        cover_art_url = track["track"]["album"]["images"][0]["url"]
        details_dict = {
            "track_name": track_name, 
            "artists": ", ".join(artists),
            "cover_art_url": cover_art_url
        }
        tracks_info.append(details_dict) 

    current_track_index = session.get('current_track_index_html', 0)
        
    if request.method == 'POST':
        if "next-button" in request.form:
            current_track_index += 1
            session['current_track_index_html'] = current_track_index
            print("Updated Track Index: " + str(current_track_index))
        elif 'previous-button' in request.form:
            current_track_index -= 1
            session['current_track_index_html'] = current_track_index
            print("Updated Track Index: " + str(current_track_index))
            
    current_track_index = min(current_track_index, len(tracks_info) - 1)

    return render_template('index.html', 
            cover_art_url_html=tracks_info[current_track_index]["cover_art_url"], 
                track_name_html=tracks_info[current_track_index]["track_name"], 
                    artist_name_html=tracks_info[current_track_index]["artists"], 
                        current_track_index_html=current_track_index)
    

@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect("/")

#Method Usage: Implement Spotify OAuthentication procedure
def create_spotify_oauth():
    return SpotifyOAuth(
        client_id = "placeholder",
        client_secret = "placeholder",
        redirect_uri = url_for("redirectPage", _external = True),
        scope = "user-library-read"
    )
    
if __name__  == "__main__":
    app.run(host = "localhost")
