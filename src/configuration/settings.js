module.exports = {
  appSettings: {
    clientSecret: "**** your app secret ****",
    clientId: "**** your app client id ****"
  },
  urls: {
    webUrl: "http://localhost:5000/",
    redirectUrl: "http://localhost:3000/callback",
    authUrl: "https://accounts.spotify.com/authorize",
    tokenUrl: "https://accounts.spotify.com/api/token"
  },
  cookies: {
    stateCookie: "spotify-state",
    spotifyCookie: "spotify-cookie",
    spotifyRefresh: "spotify-refresh"
  },
  scopes: "playlist-read-collaborative playlist-modify-private user-read-email"
};
