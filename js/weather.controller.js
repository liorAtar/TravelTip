export const weatherController = {
    onUpdateWeather
}

function onUpdateWeather(name, temp, description) {
    var strHTML = ''
    strHTML += `<h3>${name}</h3>`
    strHTML += `<h3>${temp}, ${description}</h3>`
    document.querySelector('.weather-info').innerHTML = strHTML
}
