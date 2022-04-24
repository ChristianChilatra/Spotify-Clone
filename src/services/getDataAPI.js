async function getUserProfile(token) {

    const URL_REQUEST = "https://api.spotify.com/v1/me"

    return await fetch(URL_REQUEST, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(rs => rs.json())
        .then(data => {            
            return data;
        })
}

async function getUserSaveTracks(varOffset, countPlayList, token) {

    const URL_REQUEST = `https://api.spotify.com/v1/me/tracks?offset=${varOffset}&limit=${countPlayList}`
    return await fetch(URL_REQUEST, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(rs => rs.json())
        .then(data => {
            return data;
        })
}

async function getSong(urlSong, token) {
    
    return await fetch(urlSong, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(rs => rs.json())
        .then(data => {
            console.log(data);
            return data;
        })
}

async function getCurrentlyPlayingTrack(token) {

    const URL_REQUEST = "https://api.spotify.com/v1/me/player/currently-playing"

    return await fetch(URL_REQUEST, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(rs => {
            if(rs.status === 200){
                return rs.json()
            }
        })
        .then(data => {
            return data
        })
}

async function getPlayBackState(token) {

    const URL_REQUEST = "https://api.spotify.com/v1/me/player"

    return await fetch(URL_REQUEST, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(rs => {                
            if(rs.status === 204){
                return {ms: "Spotify inactivo, no se recupero PlayBack actual"}
            }else if(rs.status === 200){
                return rs.json()
            }
        })
        .then(data => {
            return data;
        })
}

async function getDeviceList(token) {

    const URL_REQUEST = "https://api.spotify.com/v1/me/player/devices"
    
    return await fetch(URL_REQUEST, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(rs => rs.json())
        .then(data => {
            return data;
        })
}

async function checkSavedTrack(ids, token){
    
    const URL_REQUEST = `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`
    
    return await fetch(URL_REQUEST, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(rs => rs.json())
        .then(data => {
            return data;
        })
}

async function getContentTrack(query, token){
    
    const URL_REQUEST = `https://api.spotify.com/v1/search?type=track&q=${query}`
    
    return await fetch(URL_REQUEST, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }   
    })
        .then(rs => rs.json())
        .then(data => {
            return data;
        })
}


export {getUserProfile,getSong,getUserSaveTracks, getPlayBackState, getCurrentlyPlayingTrack, getDeviceList, checkSavedTrack, getContentTrack}