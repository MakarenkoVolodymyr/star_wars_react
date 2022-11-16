import { HTTP, HTTPS } from '@constants/api'

/**
 * Change URL from HTTP to HTTPS 
 * @param {String} url 
 * @returns {String} - url HTTPS
 */
export const changeHTTP = url => {
    return url ? url.replace(HTTP, HTTPS) : url; 
}

export const getApiResource = async (url) => {
    try{
        const res = await fetch(url);

        if(!res.ok){
            console.error('Could not fetch.', res.status);
            return false;
        }

        return await res.json();
    }catch(error){
        console.error('Could not fetch.', error.massage);
        return false;
    }
}

// (async () =>{
//     const body = await getApiResource(SWAPI_ROOT+SWAPI_PEOPLE);
//     console.log(body);
// })();


