const clientId = 'f556a45adae348b4ac0f486b536ea5b9';
const clientSecret = 'fe908bbe3f64418bb6a159ee0e0c321f';
const tokenUrl = 'https://accounts.spotify.com/api/token';

const Spotify = {
    async fetchAccessToken(){
      try{
        const response = await  fetch(`${tokenUrl}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
          });
        const data = await response.json();
        return data.access_token
      } catch (error){
        console.error("Error fetching access token: ", error);
        return null;
      }
    },
    async search(accessToken, term){
      try{
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        const data = await response.json();
        return data.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
              albumCover: track.album.images[2].url
        }))
      } catch (error) {
        console.error("Error retrieving tracks", error)
        return null
      }
    },
    getAuthorizationLink(){
      const redirectUri = 'http://localhost:3000';
      const scope = 'playlist-modify-public playlist-modify-private';
      const authUrl = "https://accounts.spotify.com/authorize";
      const url = `${authUrl}?client_id=${clientId}&response_type=code&redirect_uri=` + encodeURIComponent(redirectUri) + `&scope=` + encodeURIComponent(scope);
      return url;
    },
    getCodeFromUrl(){
      const match = window.location.search.match(/[?&]code=([^&]+)/);
      return match ? match[1] : null;
    },
    removeCodeFromUrl(){
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      window.history.replaceState({}, document.title, url.pathname + url.search);
    },
    async createSpotifyPlaylist(code, playlistName){
      try{
        const response = await fetch(`https://api.spotify.com/v1/users/${clientId}/playlists`, {
          headers: {
            Authorization: `Bearer ${code}`,
            "Content-Type": 'application/json'
          },
          body: {
            name: playlistName,
            public: false
          }
        })
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error creating playlist", error)
        return null
      }
    }
}

export default Spotify;