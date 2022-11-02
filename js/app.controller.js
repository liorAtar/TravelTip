import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            renderMarkers()
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
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
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
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()
        mapService.addMarker({ lat, lng })
        locService.addLoc(name, lat, lng)
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
