
//importamos iterador de dato que retorna un objeto sencillo
import buildData from "../utils/buildData";
//Constante URL de solicitud Token(key para solicictud de API)

let client_id = process.env.CLIENT_ID;
// let redirect_uri = 'http://127.0.0.1:5500/';
// let redirect_uri = 'http://localhost:5500/';
let redirect_uri = 'https://spotify-clone-five-iota.vercel.app/';

console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_ID2);

//Generamos una respuesta de autorizacion - GET
export const getAuthorize= ()=> {

    const URL_AUTHORIZE = 'https://accounts.spotify.com/authorize';

    const data = {
        'response_type':'token',
        'client_id':client_id,
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