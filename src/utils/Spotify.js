const accessToken = '';

const Spotify = {
  userParameters: {
    clientId: 'f556a45adae348b4ac0f486b536ea5b9',
    clientSecret: 'fe908bbe3f64418bb6a159ee0e0c321f',
    tokenUrl: 'https://accounts.spotify.com/api/token',
    redirectUri: 'http://localhost:3000',
    scope: 'playlist-modify-public',
    authUrl: "https://accounts.spotify.com/authorize"
  },
  generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  fetchAccessToken(){
      if(accessToken){
        return accessToken
      }

      const accessTokenMatch = window.location.href.match(/access_token=([\w-]+)/);
      const expiresInMatch = window.location.href.match(/expires_in=(\d+)/);
      let state = this.generateRandomString(16)

      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(this.userParameters.clientId);
      url += '&scope=' + encodeURIComponent(this.userParameters.scope);
      url += '&redirect_uri=' + encodeURIComponent(this.userParameters.redirectUri);
      url += '&state=' + encodeURIComponent(state);

      if(accessTokenMatch && expiresInMatch){
        window.location.href = url;
      }else{

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
    }
}

export default Spotify;