import React from "react"
import Login from "../containers/login";
import Layout from "../containers/layout";


export const App = () => {

    const authorize = window.location.hash.search("access_token")

    if (authorize === -1) {
        return (
            <Login />
        )
    } else {
        return (
            <Layout />
        )
    }


}