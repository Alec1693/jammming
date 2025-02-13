

const Spotify = {
  userParameters: {
    clientId: 'f556a45adae348b4ac0f486b536ea5b9',
    clientSecret: 'fe908bbe3f64418bb6a159ee0e0c321f',
    tokenUrl: 'https://accounts.spotify.com/api/token',
    redirectUri: 'http://localhost:3000',
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
    search(accessToken, term){
      const response = fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then(response => response.json())
        return response.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
              albumCover: track.album.images[2].url
        }))
    }
}

export default Spotify;