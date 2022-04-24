
//importamos iterador de dato que retorna un objeto sencillo
import buildData from "../utils/buildData";
//Constante URL de solicitud Token(key para solicictud de API)

let CLIENT_ID = process.env.CLIENT_ID;
let redirect_uri = 'http://localhost:5500/';

//Generamos una respuesta de autorizacion - GET
export const getAuthorize= ()=> {

    const URL_AUTHORIZE = 'https://accounts.spotify.com/authorize';

    const data = {
        'response_type':'token',
        'client_id':CLIENT_ID,
        'scope':'user-modify-playback-state+user-read-private+user-read-email+streaming+user-library-read+user-library-modify+user-read-playback-state+user-read-currently-playing',
        'redirect_uri':redirect_uri,
    }
    window.location.href = `${URL_AUTHORIZE}?${buildData(data)}`
}

// Obtenemos token de la URL

export const getToken = () => {
        const hasURL = window.location.hash

        const token = hasURL.slice(hasURL.indexOf("=")+1,(hasURL.indexOf("=",hasURL.indexOf("=")+1)))

        return token
    }
