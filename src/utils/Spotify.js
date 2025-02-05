const clientId = 'f556a45adae348b4ac0f486b536ea5b9';
const clientSecret = 'fe908bbe3f64418bb6a159ee0e0c321f';
const tokenUrl = 'https://accounts.spotify.com/api/token';

export const Spotify = {
    fetchAccessToken(){
        //create the api request parameters
        fetch(`${tokenUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        }).then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json();
        }).then(data => {
            return data.access_token;
        }).catch(error => {
            console.error('Error processing fetchAccessToken', error)
        })
    },
    search(term){
        const accessToken = Spotify.fetchAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }).then(response => {
            return response.json();
          }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
              return [];
            }
            return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }));
          });
        }
}