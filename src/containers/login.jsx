import React from "react";
import { getAuthorize } from "../services/API"
import "../styles/login.css"

export default function Login() {
    return (
        <div className="login">
            <div className="login_container-drop"></div>
            <main className="login_main">
                <i className="icon-spotify_logo">
                    <p>Spotify API</p>
                </i>
                <p className="login_p"> Al acceder sera rediriguido por autenticacion de Spotify <br /><br />
                    Luego de confirmar la autenticacion podra disfrutar de esta pequeña aplicaicon</p>
                <button className="login_button" type="submit" onClick={getAuthorize}>Acceder</button>
            </main>
        </div>
    )
}