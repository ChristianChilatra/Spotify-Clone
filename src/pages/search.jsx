import React, { useEffect, useMemo, useState } from "react";
import { checkSavedTrack, getContentTrack } from "../services/getDataAPI";
import { setDeleteTrack, setStartTrack } from "../services/setDataAPI";
import '../styles/search.css'

export default function Search({ device, token }) {

    const [input, setInput] = useState('')
    const [listResult, setListResult] = useState([])
    const [timeOutSearch, setTimeOutSearch] = useState(undefined)

    const getInputText = async (event) => {

        setListResult([])
        setInput(event.target.value)

        clearInterval(timeOutSearch)
        setTimeOutSearch(
            setTimeout(async () => {
                if (event.target.value) {

                    const resultTracks = await getContentTrack(event.target.value, token)
                    const result = await Promise.all(
                        resultTracks.tracks.items.map(async (x) => {

                            const checkIsFav = await checkSavedTrack(x.id, token)

                            return {
                                artists: x.artists[0].name,
                                id: x.id,
                                img: x.album.images[2].url,
                                isFav: checkIsFav[0],
                                name: x.name,
                                uri: x.uri
                            }
                        })
                    )
                    setListResult(result)
                }
            }, 1000)
        )
    }

    const eventFav = {
        deleteTrack: (event) => {
            setDeleteTrack(event.target.parentElement.id, token)
            setListTrack(listTrack => listTrack.filter(element => element.id != event.target.parentElement.id))
        },
    }

    const eventStart = {
        startPlayback: (event) => {
            setStartTrack(device, [event.target.id], token)
        }
    }

    if (listResult.length === 0 && input) {
        return (
            <section className="section-search">
                <div className="section-search_container-input">
                    <i className="icon-search"></i>
                    <input autoComplete="off" onChange={getInputText} className="section-search_input" value={input} type="text" name="search" id="search" placeholder="Artistas, canciones o podcast" />
                </div>
                <div className="section-search_results-loader">
                    <div className="loader-library">
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            </section>
        )
    } else if(listResult.length === 0 && !input){
        return (
            <section className="section-search">
                <div className="section-search_container-input">
                    <i className="icon-search"></i>
                    <input autoComplete="off" onChange={getInputText} className="section-search_input" value={input} type="text" name="search" id="search" placeholder="Artistas, canciones o podcast" />
                </div>
                <div className="section-search_results-loader">
                    <h2><p>Ingresa tu busqueda</p></h2>
                </div>
            </section>
        )
    }else {
        return (
            <section className="section-search">
                <div className="section-search_container-input">
                    <i className="icon-search"></i>
                    <input autoComplete="off" onChange={getInputText} className="section-search_input" value={input} type="text" name="search" id="search" placeholder="Artistas, canciones o podcast" />
                </div>
                <div className="section-search_results">
                    {
                        listResult.map((element) => {
                            return (
                                <div key={element.id} className="section-library_item" >
                                    <img className="section-library_img" src={element.img} alt="img album" width={40} />
                                    <p className="section-library_p name">{element.name}</p>
                                    <p className="section-library_p artist">{element.artists}</p>
                                    <button className="playback_button fav" id={element.id} onClick={element.isFav ? eventFav.deleteTrack : eventFav.addTrack} ><i className={element.isFav ? 'icon-fav-true' : 'icon-fav-false'}></i></button>
                                    <div className="section-library--modal-playback" id={element.uri} onClick={eventStart.startPlayback}></div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        )
    }
}