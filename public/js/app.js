console.log("Client side JS file!")

const form = document.querySelector('form')
const input = document.querySelector('input')
const errorField = document.querySelector('.error')
const locationField = document.querySelector('.location')
const forecastField = document.querySelector('.forecast')
const loading = document.querySelector('#loading')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const address = input.value
    loading.textContent = "Loading..."
    errorField.textContent = ''
    locationField.textContent = ''
    forecastField.textContent = ''

    fetch('http://127.0.0.1:3000/weather?address=' + address).then((response) => {
    response.json().then(({error, forecast, location}) => {
        loading.textContent = ""
        if(error){
            errorField.textContent = "Error: " + error
        } else{
            locationField.textContent = "Locaton: " + location
            forecastField.textContent = "Forecast: " + forecast
        }
    })
})
})