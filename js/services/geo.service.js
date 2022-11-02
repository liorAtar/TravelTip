import { Api } from "../../api.js"

export const geoService = {
    getLocation,
}

function getLocation(address){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${Api.map}`
    return axios.get(url).then(res=> res.data.results[0].geometry.location)
}
