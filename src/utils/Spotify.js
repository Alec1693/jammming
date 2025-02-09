const Spotify = {
  userParameters: {
    clientId: 'f556a45adae348b4ac0f486b536ea5b9',
    clientSecret: 'fe908bbe3f64418bb6a159ee0e0c321f',
    tokenUrl: 'https://accounts.spotify.com/api/token',
    redirectUri: 'http://localhost:3000',
    scope: 'playlist-modify-public playlist-modify-private',
    authUrl: "https://accounts.spotify.com/authorize"
  },
    async fetchAccessToken(){
      try{
        const response = await  fetch(`${this.userParameters.tokenUrl}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `grant_type=client_credentials&client_id=${this.userParameters.clientId}&client_secret=${this.userParameters.clientSecret}`,
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
        const response = await fetch(`https://api.spotify.com/v1/users/${this.userParameters.clientId}/playlists`, {
          method: 'POST',
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
    },
    generateRandomString(length){
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    },
    async sha256(plain){
      const encoder = new TextEncoder()
      const data = encoder.encode(plain)
      return window.crypto.subtle.digest('SHA-256', data)
    },
    base64encode(input){
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    },
    async codeChallengeGenerator(){
      const codeVerifier  = this.generateRandomString(64);
      const hashed = await this.sha256(codeVerifier)
      const codeChallenge = this.base64encode(hashed);
      window.localStorage.setItem('code_verifier', codeVerifier);
      const params =  {
        response_type: 'code',
        client_id: this.userParameters.clientId,
        scope: this.userParameters.scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: this.userParameters.redirectUri,
      }
      const tempUrl = new URL(this.userParameters.authUrl);
      tempUrl.search = new URLSearchParams(params).toString();
      window.location.href = tempUrl.toString();

      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code');
      //this.getTokenFromCode(code, codeVerifier);
    },
    async getTokenFromCode(code, codeVerifier){
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.userParameters.clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.userParameters.redirectUri,
          code_verifier: codeVerifier,
        }),
      }
    
      const body = await fetch(this.userParameters.tokenUrl, payload);
      const response = await body.json();
      return response.access_token;
    }
}

export default Spotify;