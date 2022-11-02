window.onSearchLocation = onSearchLocation

const GEO_API = 'AIzaSyAn_Ij60OAOhlvDr-QtD_Ih-JHFtzPdV6o'

function onSearchLocation(){
    let location = document.querySelector('.search-input').value
    let address = location.replace(/\s/g, '%')
    console.log(address)
    getLocation(address)
}

function getLocation(address){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEO_API}`
    const prm1 = fetch(url)
    .then(res => fetch(res.url))
    .then(console.log)
}