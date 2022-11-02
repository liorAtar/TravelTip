import { geoService } from "./services/geo.service.js"
import { weatherService } from './services/weather.service.js'
import { weatherController } from './weather.controller.js'

window.onSearchLocation = onSearchLocation

function onSearchLocation() {
    let location = document.querySelector('.search-input').value
    let address = location.replace(/\s/g, '%')
    console.log(address)
    geoService.getLocation(address)
        .then(({ lat, lng }) => weatherService.getLocationWeather(lat, lng)
            .then(res => weatherController.onUpdateWeather(res.data.sys.country, res.data.main.temp, res.data.weather[0].description)))
}
