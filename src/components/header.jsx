import React, { useContext, useEffect, useState } from "react";
import Context from "../contexts/staticContext";
import { getUserProfile } from "../services/getDataAPI";

import '../styles/header.css'


const currentlyHour = () => {
    const date = new Date()
    return date.getHours()
}

const getIntervalDay = (hour) => {

    if (hour === 0 || hour < 12) {
        return "Buenos dias"
    }
    if (hour < 11 || hour < 18) {
        return "Buenas tardes"
    }
    if (hour < 17 || hour < 24) {
        return "Buenas noches"
    }
}

export default function Header({ token }) {

    const [intervalDay, setIntervalDay] = useState(getIntervalDay(currentlyHour()))
    const [imgProfile, setImgProfile] = useState("")
    const [pathName, setPathName] = useState(location.pathname)
    const {header, setHeader} = useContext(Context)

    setInterval(() => {
        intervalDay != getIntervalDay(currentlyHour()) ?
            setIntervalDay(getIntervalDay(currentlyHour())) :
            ""
        if (pathName != location.pathname) {
            setPathName(location.pathname)
        }
    }, 500)

    useEffect(() => {
        getUserProfile(token).then(rs => setImgProfile(rs.images[0].url))
    }, [])

    if (header === "/") {
        return (
            <header>
                <p className="header_p">{intervalDay}</p>
            </header>
        )
    } else if (header === "/search") {
        return (
            <header>
                <p className="header_p">Buscar</p>
            </header>
        )
    } else if (header === "/library") {
        return (
            <header style={{"blockSize":"2rem"}}>
                <div className="header_profile">
                    <img className='header_img' src={imgProfile} alt="Image Profile" width={30} />
                    <p className="header_p">Tu Biblioteca</p>
                </div>
            </header>
        )
    }

}