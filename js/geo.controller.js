import { geoService } from "./services/geo.service.js"
import { weatherService } from './services/weather.service.js'

window.onSearchLocation = onSearchLocation

function onSearchLocation() {
    let location = document.querySelector('.search-input').value
    let address = location.replace(/\s/g, '%')
    console.log(address)
    geoService.getLocation(address).then(({lat, lng}) => weatherService.getLocationWeather(lat, lng))
}
