const CITY_NAME = 'Bogota'

const API_KEY = '35f44bee6f329fca8fb84e86f7842faa'

const API_DAY = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`


const API_PARIS = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${API_KEY}`


const API_DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}`

//? Día actual

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
    //console.log(':: Day : ', actualDay)
    nameCityActual.innerHTML = actualDay.name
    weatherCityActual.innerHTML = actualDay.weather[0].main
    temperatureCityActual.innerHTML = Math.trunc(actualDay.main.temp - 273.15)
  } catch (error) {
    console.error(':: error ', error)
  }
}

async function loadInfoCallDays() {
  try {
    const days = await ajax(API_DAYS, loadInfoDayActual)
    let contador = 0
    let contadordiario = 0

    const nombreDelDiaSegunFecha = (fecha) =>
      [
        'sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ][new Date(fecha).getDay()]

    days.list.map((props) => {
      contador++

      if (contador == 1) {
        contadordiario++

        //? dia de la semana
        let forecast = document.getElementById(`forecastDay${contadordiario}`)
        forecast.innerHTML = nombreDelDiaSegunFecha(props.dt_txt)

        //? estado del clima
        let forecastWeather = document.getElementById(
          `forecastWeather${contadordiario}`
        )

        forecastWeather.innerHTML = props.weather[0].main


        //? Temperatura maxima y minima
        let tempMax = document.getElementById(
          `forecastTempMax${contadordiario}`
        )
        tempMax.innerHTML = Math.trunc(props.main.temp_max - 273.15)
        let tempMin = document.getElementById(
          `forecastTempMin${contadordiario}`
        )
        tempMin.innerHTML = Math.trunc(props.main.temp_min - 273.15)

        //? selector de imagenes
        console.log(document.getElementById('forecastImgDay1').src)
      } else if (contador % 9 == 0 && contador < 20) {
        contadordiario++
        //? dia de la semana
        let forecast = document.getElementById(`forecastDay${contadordiario}`)
        forecast.innerHTML = nombreDelDiaSegunFecha(props.dt_txt)

        //? estado del clima
        let forecastWeather = document.getElementById(
          `forecastWeather${contadordiario}`
        )

        forecastWeather.innerHTML = props.weather[0].main


        //? Temperatura maxima y minima
        let tempMax = document.getElementById(
          `forecastTempMax${contadordiario}`
        )
        tempMax.innerHTML = Math.trunc(props.main.temp_max - 273.15)
        let tempMin = document.getElementById(
          `forecastTempMin${contadordiario}`
        )
        tempMin.innerHTML = Math.trunc(props.main.temp_min - 273.15)
      } else {
      }
      //
    })

    //console.log(' :: Days ', days.list)
  } catch (error) {
    console.error(' :: Error ', error)
  }
}


async function loadInfoParis() {
  try {
    const city = await ajax(API_PARIS, loadInfoParis)
    console.log(':: city : ', city)

    let name = document.getElementById('cityName')
    name.innerHTML = city.name

    let county = document.getElementById('cityCountryName')
    county.innerHTML = city.sys.country

    let temperature = document.getElementById('cityTemp')
    temperature.innerHTML = Math.trunc(city.main.temp - 273.15)

    let humicity = document.getElementById('cityHumicity')
    humicity.innerHTML = city.main.humidity

    let windSpeed = document.getElementById('cityWindSpeed')
    windSpeed.innerHTML = city.wind.speed
  } catch (error) {
    console.error(':: Error :', error)
  }
}

loadInfoDayActual()
loadInfoCallDays()
loadInfoParis()

