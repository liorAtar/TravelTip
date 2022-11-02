export const locService = {
    getLocs,
    addLoc,
    getPlaceById,
    removePlace
}

const locs = [
    {id:makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    {id:makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLoc(name, lat, lng) {
    locs.unshift({ id:makeId(), name, lat, lng})
}

function getPlaceById(placeId) {
    return locs.find(p => p.id === placeId)
}

function removePlace(placeId) {
    const idx = locs.findIndex(p => p.id !== placeId)
    locs.splice(idx, 1)
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
