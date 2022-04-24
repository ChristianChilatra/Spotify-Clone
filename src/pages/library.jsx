import React, { useEffect, useState } from "react";
import { getUserSaveTracks, checkSavedTrack } from "../services/getDataAPI";
import { setAddTrack, setDeleteTrack, setStartTrack } from "../services/setDataAPI";

import '../styles/library.css'

export default function Library({ token, device }) {

    const [listTrack, setListTrack] = useState([])

    useEffect(async () => {

        const resultTracks = await getUserSaveTracks(0, 20, token)
        const result = await Promise.all(
            resultTracks.items.map(async x => {

                const checkIsFav = await checkSavedTrack(x.track.id, token)

                return {
                    artists: x.track.artists[0].name,
                    id: x.track.id,
                    img: x.track.album.images[2].url,
                    isFav: checkIsFav[0],
                    name: x.track.name,
                    uri: x.track.uri
                }
            })
        )

        setListTrack(result)

        let varOffset = 0
        let countPlayList = 0

        const handleIntersection = async (entries) => {


            if (entries[0]["isIntersecting"] === true) {

                varOffset += 20
                countPlayList = 20

                const resultTracks = await getUserSaveTracks(varOffset, countPlayList, token)
                const result = await Promise.all(
                    resultTracks.items.map( async x => {

                        const checkIsFav = await checkSavedTrack(x.track.id, token)

                        return {
                            artists: x.track.artists[0].name,
                            id: x.track.id,
                            img: x.track.album.images[2].url,
                            isFav: checkIsFav,
                            name: x.track.name,
                            uri: x.track.uri
                        }
                    })
                )

                setListTrack(listTrack => [...listTrack, ...result])

            }

        }


        const observe = new IntersectionObserver(handleIntersection);
        observe.observe(document.querySelector(".colaider"));
    }, [])

    const eventFav = {
        deleteTrack: (event) => {
            setDeleteTrack(event.target.parentElement.id, token)

            setListTrack(listTrack => listTrack.filter(element => element.id != event.target.parentElement.id))
        },
        addTrack : (event) => {
            setAddTrack(event.target.parentElement.id, token)

            setListTrack(listTrack => listTrack.filter(element => element.id != event.target.parentElement.id))
        },
    }

    const eventStart = {
        startPlayback: (event) => {

            const resultFilter = listTrack.filter(element => element.id === event.target.id)
            const resultIndexOf = listTrack.indexOf(...resultFilter)
            const newArray = listTrack.filter((element, index) => index >= resultIndexOf)
            const resultMap = newArray.map(element => element.uri)

            setStartTrack(device, resultMap, token)
        }
    }

    if(listTrack != ""){
        return (
            <section className="section-library">
                {
                    listTrack.map((element) => {
                        return (
                            <div key={element.id} className="section-library_item" >
                                <img className="section-library_img" src={element.img} alt="img album" width={40} />
                                <p className="section-library_p name">{element.name}</p>
                                <p className="section-library_p artist">{element.artists}</p>
                                <button className="playback_button fav" id={element.id} onClick={element.isFav ? eventFav.deleteTrack : eventFav.addTrack} OnTouchStart={element.isFav ? eventFav.deleteTrack : eventFav.addTrack} ><i className={element.isFav ? 'icon-fav-true' : 'icon-fav-false'}></i></button>
                                <div className="section-library--modal-playback" id={element.id} onClick={eventStart.startPlayback} OnTouchStart={eventStart.startPlayback}></div>
                            </div>
                        )
                    })
                }
                <div className="colaider"></div>
            </section>
        )
    }else{
        return (
            <div className="loader-library">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}