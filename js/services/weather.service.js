import { Api } from "../../api.js"

export const weatherService = {
    getLocationWeather,
}

function getLocationWeather(lat = 32.0749831, lon = 34.9120554) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Api.weather}`)
}
