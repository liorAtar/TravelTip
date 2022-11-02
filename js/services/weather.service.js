import { Api } from "../../api.js"

export const weatherService = {
    getLocationWeather,
}

function getLocationWeather(lat,lng) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${Api.weather}`)
}
