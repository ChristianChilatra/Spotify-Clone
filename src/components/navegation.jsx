import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import '../styles/navegation.css'
import Context from "../contexts/staticContext";

export default function Navegation({ hashPage }) {

    const {header, setHeader} = useContext(Context)

    const setHeaderHome = ()=>{
        setHeader("/")
    }
    const setHeaderSearch = ()=>{
        setHeader("/search")
    }
    const setHeaderLibrary = ()=>{
        setHeader("/library");
    }

    return (
        <nav>
            <ul className="nav_ul">
                    <li className="nav_li">
                        <button className="nav_button" onClick={setHeaderHome}>
                            <NavLink className="nav_a" to={`/${hashPage}`}><i className="icon-home"></i>Inicio</NavLink>
                        </button>
                    </li>
                    <li className="nav_li">
                        <button className="nav_button" onClick={setHeaderSearch}>
                            <NavLink className="nav_a" to={`/search${hashPage}`}><i className="icon-search"></i>Buscar</NavLink>
                        </button>
                    </li>
                    <li className="nav_li">
                        <button className="nav_button" onClick={setHeaderLibrary}>
                            <NavLink className="nav_a" to={`/library${hashPage}`}><i className="icon-library"></i>Tu Biblioteca</NavLink>
                        </button>
                    </li>
            </ul>
        </nav>
    )
}