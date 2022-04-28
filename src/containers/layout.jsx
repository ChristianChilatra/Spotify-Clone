import React, { useRef, useState } from "react";
import { getToken } from "../services/API";
import { Routes, Route } from "react-router";
import Context from "../contexts/staticContext";

import Header from "../components/header";
import Playback from "../components/playback";
import Navegation from "../components/navegation";
import Home from "../pages/home";
import Search from "../pages/search";
import Library from "../pages/library";
import '../styles/layout.css'

export default function Layout() {

    const [deviceId, setDeviceId] = useState('')
    const [header, setHeader] = useState(location.pathname)
    const token = getToken()
        
    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new Spotify.Player({
            name: 'Spotify API',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });
        // Ready
        player.addListener('ready', ({ device_id }) => {
            setDeviceId(device_id)
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            setDeviceId(device_id)
        });
        player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('account_error', ({ message }) => {
            console.error(message);
        });

        player.connect()

    }

    return (
        <div className="layout">
            <Context.Provider value={{ "header" : header, "setHeader" : setHeader }}>
                <Header token={token} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search token={token} device={deviceId} />} />
                    <Route path="/library" element={<Library token={token} device={deviceId} />} />
                </Routes>
                <Playback token={token} device={deviceId} />
                <Navegation hashPage={location.hash} />
            </Context.Provider>
        </div>
    )
}