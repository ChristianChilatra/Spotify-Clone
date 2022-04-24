import React,{useContext}from 'react'
import staticContext from "../contexts/staticContext";

async function setPausePlayback(token, device_id) {

    const URL_REQUEST = `https://api.spotify.com/v1/me/player/pause?device_id_id=${device_id}`

    return await fetch(URL_REQUEST, {
        method: 'PUT',
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
            return data;
        })
}
async function setStartPlayback(token, device_id) {

    const URL_REQUEST = `https://api.spotify.com/v1/me/player/play?device_id_id=${device_id}`

    return await fetch(URL_REQUEST, {
        method: 'PUT',
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
            return data;
        })
}

async function setDeleteTrack(ids, token) {

    const URL_REQUEST = `https://api.spotify.com/v1/me/tracks?ids=${ids}`

    return await fetch(URL_REQUEST, {
        method: 'DELETE',
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

async function setAddTrack(ids, token) {

    const URL_REQUEST = `https://api.spotify.com/v1/me/tracks?ids=${ids}`

    return await fetch(URL_REQUEST, {
        method: 'PUT',
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

async function setStartTrack(ids,uri,token) {

    const URL_REQUEST = `https://api.spotify.com/v1/me/player/play?device_id=${ids}`

    const data = {
        "uris": uri,
        "position_ms": 0
    }

    return await fetch(URL_REQUEST, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(rs => {
            if(rs.status === 200){
                return rs.json()
            }
        })
        .then(data => {
            return data;
        })
}

async function setTransferPlayback(ids,token) {

    const URL_REQUEST = `https://api.spotify.com/v1/me/player`

    const data = {
        "device_ids": [ids]
    }

    return await fetch(URL_REQUEST, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(rs => {
            if(rs.status === 200){
                return rs.json()
            }
        })
        .then(data => {
            return data;
        })
}


export {setPausePlayback, setStartPlayback, setDeleteTrack, setAddTrack, setStartTrack, setTransferPlayback}