const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

const inputField = document.querySelector(".input-field")
const searchBtn = document.querySelector(".search-btn")
const city = document.querySelector(".city")
const longitude = document.querySelector('.longitude')
const latitude = document.querySelector('.latitude')
const timeDate = document.querySelector(".time-and-date")
const tempC = document.querySelector(".temperatureC")
const tempF = document.querySelector(".temperatureF")
const description = document.querySelector(".description")


searchBtn.addEventListener("click", ()=>{
    fetchWeather(inputField.value)
})

async function fetchWeather(location){
    let response = await fetch(url + location + "?key=98FMLYRCNZZAMM3N7D737YQVY");
    let result = await response.json()

    let cityName = result.address.toUpperCase()
    city.innerHTML = cityName

    latitude.innerHTML = result.latitude
    longitude.innerHTML = result.longitude

    let epoch = result.currentConditions.datetimeEpoch
    let date = new Date(epoch * 1000)
    let formatted = date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
     });
    timeDate.innerHTML = formatted

    let temperatureInF = result.currentConditions.temp
    let temperatureInC = ((temperatureInF - 32) * (5/9)).toFixed(2)
    tempC.innerHTML = temperatureInC + "&deg;C"
    tempF.innerHTML = temperatureInF + "&deg;F"
    
    description.innerHTML = result.description
}




