import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "ugc-image-upload",
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  // "user-read-private",
  // "user-read-birthdate",
].join(",");

const param = {
  scope: scopes,
};

const queryParamStrinng = new URLSearchParams(param).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamStrinng}`;

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: "http://localhost:3000/api/auth/callback",
});

export default spotifyAPI;
export { LOGIN_URL };
