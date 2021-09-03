const CITY_NAME = 'Bogota'

const API_KEY = 'c7b130ee1874590f4e7828eab0fbf4fd'

const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`

const API_CALL_DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}`

let nameCityActual = document.getElementById('city-actual-name')
let weatherCityActual = document.getElementById('weather-acity-actual')
let temperatureCityActual = document.getElementById('temperature-city-actual')

function ajax(url, callback) {
  const xhttp = new XMLHttpRequest()
  xhttp.onload = function () {
    callback(JSON.parse(this.responseText))
  }
  xhttp.open('GET', url)
  xhttp.send()
}

async function loadInfoDayActual() {
  const actualDay = await ajax(API_URL, loadInfoDayActual)
  console.log(':: Day : ', actualDay)
  /*   nameCityActual.innerHTML = actualDay.name
  weatherCityActual.innerHTML = actualDay.weather[0].main
  temperatureCityActual.innerHTML = Math.trunc(actualDay.main.temp - 273.15) */
}

async function loadInfoCallDays() {
  const days = await ajax(API_URL, loadInfoDayActual)

  console.log(' :: resultado : ', days)
}

loadInfoDayActual()
loadInfoCallDays()
