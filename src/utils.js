const request = require('request')
require('dotenv').config();

const geoCode = (address, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + encodeURIComponent(process.env.googleGeoCode_Key)
    console.log(url)
    
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service')
        } else if (body.results.length === 0) {
            callback('Unable to find location')
        } else{
            const lat = body.results[0].geometry.location.lat
            const lng = body.results[0].geometry.location.lng
            const loc = body.results[0].formatted_address
            callback(undefined, {
                lat,
                lng,
                loc
            })
        }
    })
}

const forecast = (latitude, longitude, callback) => {
    const url =  "http://api.weatherstack.com/current?access_key=" + encodeURIComponent(process.env.weatherStack_Key) + "&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=m"
    
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather service")
        } else if (body.error){
            callback("Unable to find location")
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees!")
        }
    })
}


module.exports = {
    geoCode: geoCode,
    forecast: forecast
}