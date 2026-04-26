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
const tempArea = document.querySelector('.location-temperature')
const body = document.querySelector("body")

searchBtn.addEventListener("click", ()=>{
    tempArea.style.backgroundColor = "rgba(0,0,0,0.5)"
    city.innerHTML = "Loading..."
    latitude.innerHTML = ""
    longitude.innerHTML = ""
    timeDate.innerHTML = ""
    tempC.innerHTML = ""
    tempF.innerHTML = ""
    description.innerHTML = ""
    fetchWeather(inputField.value)
})

async function fetchWeather(location){
    if(location === undefined || location === null || location === ""){
        city.innerHTML = "Invalid Location"
        return;
    }
    try{
        let response = await fetch(url + location + "?key=98FMLYRCNZZAMM3N7D737YQVY");
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let result = await response.json();
        
        let cityName = result.address.toUpperCase()
        city.innerHTML = cityName

        let lat = "Latitude: " + result.latitude + " || "
        latitude.innerHTML = lat;
        let long = "Longitude: " + result.longitude
        longitude.innerHTML = long

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
        if(temperatureInC <= 18){
            body.style.background = "url('./assets/cool-new.png')"
            body.style.backgroundSize = "cover";
            body.style.backgroundPosition = "center";
            body.style.backgroundRepeat = "no-repeat";
        } else if(temperatureInC > 18 && temperatureInC <= 30){
            body.style.background = "url('./assets/warm-new.png')"
            body.style.backgroundSize = "cover";
            body.style.backgroundPosition = "center";
            body.style.backgroundRepeat = "no-repeat";
        } else{
            body.style.background = "url('./assets/hot-new.png')"
            body.style.backgroundSize = "cover";
            body.style.backgroundPosition = "center";
        }
        tempC.innerHTML = temperatureInC + "&deg;C"
        tempF.innerHTML = temperatureInF + "&deg;F"

        description.innerHTML = result.description
    } catch (error) {
        city.innerHTML = "Error: Check console";
        console.log(error)
    }
}