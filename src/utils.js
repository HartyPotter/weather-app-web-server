const request = require('request')


const geoCode = (address, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=AIzaSyC5sf00LTzUtxJJmAuC0Hl41JtQG-2ZAZ8'

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
    const url =  "http://api.weatherstack.com/current?access_key=93fa30b2eafa280b55faa2885532f21c&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=m"
    
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