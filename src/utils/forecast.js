const request = require('request')

const getForecast = (latitude, longitude, units, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c01ca590c30c4e5bd543658dc26b5bc2&query=' + latitude + ',' + longitude + '&units=' + units
    //console.log(weatherUrl)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather request', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const current = body.current
            //console.log(forecastResponse.body)
            if (!current) {
                return callback('Weather cannot be accessed', undefined)
            }
            const temperature = current.temperature
            const feelsLike = current.feelslike
            const data = current.weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLike + ' degrees out.'
            callback(undefined, data)
        }
    })
}

module.exports = getForecast