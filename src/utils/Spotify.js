

const Spotify = {
  userParameters: {
    clientId: 'f556a45adae348b4ac0f486b536ea5b9',
    userId: '12128830856',
    clientSecret: 'fe908bbe3f64418bb6a159ee0e0c321f',
    tokenUrl: 'https://accounts.spotify.com/api/token',
    redirectUri: 'https://magenta-llama-22da0d.netlify.app/',
    scope: 'playlist-modify-public',
    authUrl: "https://accounts.spotify.com/authorize"
  },
  accessToken: null,
  fetchAccessToken(){
    //if the accessToken is assigned the value of an accessTOken then return it
      if(Spotify.accessToken){
        return Spotify.accessToken
      }
      //build the url with the user's data to be sent to spotify
      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(Spotify.userParameters.clientId);
      url += '&scope=' + encodeURIComponent(Spotify.userParameters.scope);
      url += '&redirect_uri=' + encodeURIComponent(Spotify.userParameters.redirectUri);
      //search the url with regex to find the access token and expires in parameters and assign each to a variable
      const accessTokenMatch = window.location.href.match(/access_token=([\w-]+)/);
      const expiresInMatch = window.location.href.match(/expires_in=(\d+)/);
      //check if the previous regex statements have assigned values to the variables below
      if(accessTokenMatch && expiresInMatch){
        //the access token exists in the 2nd list item of the match variable, assign it to the variable accessToken to be returned
        Spotify.accessToken = accessTokenMatch[1];
        //we want to set a timeout to occur when the access_token expires. the [1] expires in value has the duration stored in ms. we want to change it to seconds by multiplying by 1000
        window.setTimeout(() => Spotify.accessToken = null, expiresInMatch[1] * 1000);
        // Clear the URL fragment for security reasons
        window.history.pushState({}, null, window.location.pathname);
        //now we need to return the accessToken so it can be used. 
        return Spotify.accessToken;
      } else{
        //change the url so we can authenticate with spotify
        window.location.href = url;
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
          uri: track.uri
    }))
      }catch(e){
        console.error("Error in Spotify Search function", e)
      }
    },
    async createPlaylistWithTracks(accessToken, pName, tracks){
      try{
        const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${Spotify.userParameters.userId}/playlists`, {
        method: 'POST',  
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: pName,
            description: 'We made a playlist with Alecs React program',
            public: true
          })
        })
        const createPlaylistData = await createPlaylistResponse.json();
        const playlistId = createPlaylistData.id;
        await Spotify.addTracksToPlaylist(tracks, playlistId, accessToken);
      }catch(e){
        console.error("Error creating playlist", e)
      }
    },
    async addTracksToPlaylist(tracks, id, accessToken){
      const uriList = Spotify.createUriList(tracks);
      try{
        await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uris: uriList
          })
        })
      }catch(e){
        console.error("Error adding tracks to playlist");
      }
    },
    async getUserData(){
      try{
        const userDataResponse = await fetch(`https://api.spotify.com/v1/users/${Spotify.userParameters.userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Spotify.accessToken}`
          }
        })
        let userData = await userDataResponse.json();
        return userData
      }catch(e){
        console.error('Error fetching user data', e);
      }
    },
    createUriList(trackList){
      const trackUriList = trackList.map(track => track.uri)
      return trackUriList;
    }
}

export default Spotify;