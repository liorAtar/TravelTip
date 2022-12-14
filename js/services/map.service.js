import { Api } from "../../api.js"
import { locService } from "./loc.service.js"

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap,
    onGoRequestedPlace,
    onZoomMap
}

// Var that is used throughout this Module (not global)
var gMap

function getMap() {
    return gMap
}

function initMap(lat,lng) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    // const API_KEY = '' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${Api.map}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function onGoRequestedPlace(placeId) {
    const { lat, lng } = locService.getPlaceById(placeId)
    onZoomMap(lat, lng)
    return { lat , lng }
}

function onZoomMap(lat, lng){
    gMap.setCenter(new google.maps.LatLng(lat,lng))
    gMap.setZoom(15)
}