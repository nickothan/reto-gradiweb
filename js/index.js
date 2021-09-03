const CITY_NAME = 'Bogota'

const API_KEY = 'c7b130ee1874590f4e7828eab0fbf4fd'

const API_DAY = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`

const API_DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}`

let nameCityActual = document.getElementById('city-actual-name')
let weatherCityActual = document.getElementById('weather-acity-actual')
let temperatureCityActual = document.getElementById('temperature-city-actual')

function ajax(url) {
  return new Promise(function (resolve, reject) {
    const xhttp = new XMLHttpRequest()
    xhttp.open('GET', url)
    xhttp.onload = function () {
      if (this.status >= 200 && this.status < 300)
        resolve(JSON.parse(this.responseText))
      reject(this)
    }
    xhttp.onerror = function () {
      reject(this)
    }
    xhttp.send()
  })
}

async function loadInfoDayActual() {
  try {
    const actualDay = await ajax(API_DAY, loadInfoDayActual)
    console.log(':: Day : ', actualDay)
    /*   nameCityActual.innerHTML = actualDay.name
    weatherCityActual.innerHTML = actualDay.weather[0].main
    temperatureCityActual.innerHTML = Math.trunc(actualDay.main.temp - 273.15) */
  } catch (error) {
    console.error(':: error ', error)
  }
}

async function loadInfoCallDays() {
  try {
    const days = await ajax(API_DAYS, loadInfoDayActual)
    console.log(' :: Days ', days)
  } catch (error) {
    console.log(' :: Error ', error)
  }
}

loadInfoDayActual()
loadInfoCallDays()
