import React, { useEffect, useRef, useState } from "react";
import { checkSavedTrack, getCurrentlyPlayingTrack, getDeviceList } from "../services/getDataAPI";
import { setAddTrack, setDeleteTrack, setPausePlayback, setStartPlayback, setTransferPlayback } from "../services/setDataAPI";

import '../styles/playback.css'

export default function Playback({ token , device}) {

    const [imgAlbum, setImgAlbum] = useState("")
    const [nameAlbum, setNameAlbum] = useState("")
    const [nameArtist, setNameArtist] = useState("")
    const [statePlayBack, setStatePlayBack] = useState("")
    const [progresMusic, setProgresMusic] = useState("")
    const [deviceList, setDeviceList] = useState([])
    const [isFav, setIsFav] = useState("")
    const [eventFav, setEventFav] = useState(false)

    const $modal  = useRef(null)

    useEffect(async () => {
        setInterval(async () => {
                    
            const resutlCurrentlyPlayingTrack = await getCurrentlyPlayingTrack(token)      

            if (resutlCurrentlyPlayingTrack) {

                const resultDeviceList = await getDeviceList(token)
                const resultChackSavedTrack = await checkSavedTrack(resutlCurrentlyPlayingTrack.item.id, token)

                setDeviceList(resultDeviceList.devices)
                setIsFav(resultChackSavedTrack[0])

                setEventFav({
                    deleteTrack: () => {
                        setDeleteTrack(resutlCurrentlyPlayingTrack.item.id, token)
                    },
                    addTrack: () => {
                        setAddTrack(resutlCurrentlyPlayingTrack.item.id, token)
                    }
                }
                )

                setImgAlbum(resutlCurrentlyPlayingTrack.item.album.images[2].url)
                setNameAlbum(resutlCurrentlyPlayingTrack.item.name)
                setNameArtist(resutlCurrentlyPlayingTrack.item.artists[0].name)
                setStatePlayBack(resutlCurrentlyPlayingTrack.is_playing)
                setProgresMusic(resutlCurrentlyPlayingTrack.progress_ms)
            }else{
                
            }

        }, 1000)
    }, [])

    const deviceCurrently = () => {

        const result = deviceList.find(element => element.is_active)
        return result.name
    }
    
    const selectDevice = (event)=>{
        setTransferPlayback(event.target.id, token)
    }

    const openModal = () => {
        $modal.current.showModal();
    }

    const closeModal = () => {
        $modal.current.close();
    }

    const pausePlayback = () => {
        setPausePlayback(token, device)
    }

    const startPlayback = () => {
        setStartPlayback(token, device)
    }

    if (imgAlbum) {

        return (
            <>
                <div className="playback">
                    <img className="playback_img" src={imgAlbum} alt="Imagen Album" width={45} height={45} />
                    <marquee behavior="Scroll" scrolldelay="150"><p className="playback_p">{nameAlbum} • {nameArtist}</p></marquee>
                    <div className="playback_deviceCurrently"><i className="icon-volume-up playback--icon-device"></i><span>{deviceCurrently()}</span></div>
                    <button className="playback_button device" onClick={openModal}><i className="icon-device"></i></button>
                    <button className="playback_button state" onClick={statePlayBack ? pausePlayback : startPlayback} ><i className={statePlayBack ? 'icon-pause' : 'icon-play'}></i></button>
                    <button className="playback_button fav" onClick={isFav ? eventFav.deleteTrack : eventFav.addTrack} ><i className={isFav ? 'icon-fav-true' : 'icon-fav-false'}></i></button>
                    <div className="playback_progress-ms" style={{ inlineSize: `${(progresMusic / 2200)}%` }}></div>
                    <div className="playback_progress-back"></div>
                </div>
                <dialog className="playback-dialog" ref={$modal}>
                    <div className="playback-dialog_container">
                        <i className="icon-close dialog" onClick={closeModal}></i>
                        <section className="playback-dialog-devices">
                            <>
                                <h2>Dispositivo actual</h2>
                                {deviceList.map(element => {
                                    return (element.is_active ?
                                        <div key={element.id}>
                                            <i className={element.type === "Smartphone" ? "icon-mobile" : "icon-portatil"}></i>
                                            <p className="playback-dialog_p-currently-device" key={element.id}>{element.name}</p>
                                        </div>
                                        : ""
                                    )
                                })}
                                {deviceList.length > 1 ?
                                    <>
                                        <h3>Seleccione un dipositivo</h3>
                                        {deviceList.map(element => {
                                            return (!element.is_active ?
                                                <div key={element.id}>
                                                    <button id={element.id} className="playback_button" onClick={selectDevice}>
                                                        <i id={element.id} className={element.type === "Smartphone" ? "icon-mobile" : "icon-portatil"}></i>
                                                        <p id={element.id} className="playback-dialog_p-device" key={element.id}>{element.name}</p>
                                                    </button>
                                                </div>
                                                : ""
                                            )
                                        })}
                                    </>
                                    : ""}
                            </>
                        </section>
                    </div>
                </dialog>
            </>

        )
    } else {
        return (
            <div className="playback" style={{ insetBlockEnd: "-10%" }}></div>
        )
    }
}
