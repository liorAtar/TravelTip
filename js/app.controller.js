import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'
import { weatherController } from './weather.controller.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGoToPlace = onGoToPlace
window.onRemovePlace = onRemovePlace
window.onCopyLink = onCopyLink

function onInit() {
    let { lat, lng } = renderPageByQueryStringParams() || { lat: 32.0749831, lng: 34.9120554 }
    renderLocations()
    mapService.initMap(lat, lng)
        .then(() => {
            console.log('Map is ready')
            renderMarkers()
            weatherService.getLocationWeather(lat, lng)
            .then(res => weatherController.onUpdateWeather(res.data.sys.country, res.data.main.temp, res.data.weather[0].description))
            clickMapLocEvent()
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
            mapService.onZoomMap(pos.coords.latitude, pos.coords.longitude)
            locService.addLoc('My Location', pos.coords.latitude, pos.coords.longitude)
            renderMarkers()
            renderLocations()
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function clickMapLocEvent() {
    //Add new place on map click 
    mapService.getMap().addListener('click', ev => {
        const name = prompt('Place name?', 'New Place')
        if (name) {
            const lat = ev.latLng.lat()
            const lng = ev.latLng.lng()
            mapService.addMarker({ lat, lng })
            locService.addLoc(name, lat, lng)
            renderMarkers()
            renderLocations()
        }
    })
}

function renderMarkers() {
    locService.getLocs().then(locs => {
        // remove previous markers
        locs.forEach(loc => new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map: mapService.getMap(),
            title: loc.name
        }).setMap(null))

        // create a marker for every place
        locs.map(({ name, lat, lng }) => {
            const coord = { lat, lng }
            return new google.maps.Marker({
                position: coord,
                map: mapService.getMap(),
                title: name
            })
        })
    })
}

function renderLocations() {
    console.log('render')
    locService.getLocs().then(locs => {
        return locs.map(loc =>
            `<ul>${loc.name} <button onclick="onGoToPlace('${loc.id}')">GO</button> <button onclick="onRemovePlace('${loc.id}')">X</button> </ul>`
        )
    }
    ).then(str => {
        let elTable = document.querySelector('.locations-table')
        elTable.innerHTML = str.join('')
    })
}

function onGoToPlace(placeId) {
    let pos = mapService.onGoRequestedPlace(placeId)
    setQueryParams(pos)
}

function onRemovePlace(placeId) {
    locService.removePlace(placeId)
    renderMarkers()
    renderLocations()
}


function setQueryParams({ lat, lng }) {
    const queryStringParams = `?lat=${lat}&lng=${lng}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderPageByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    let lat = +queryStringParams.get('lat')
    let lng = +queryStringParams.get('lng')
    return { lat, lng }
}

function onCopyLink() {
    // Get the text field
    const link = window.location.href;
    console.log(link)
    // Copy the text inside the text field
    navigator.clipboard.writeText(link).then(() => alert('copy!'))
}