export const weatherController = {
    onUpdateWeather
}

function onUpdateWeather(country, temp, description) {
    var strHTML = ''
    strHTML += `<h3>${country ? country : 'Ocean'}</h3>`
    strHTML += `<h3>${temp}, ${description}</h3>`
    document.querySelector('.weather-info').innerHTML = strHTML
}
