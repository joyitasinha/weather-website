const request = require('request')
const getGeoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoiam95aXRhIiwiYSI6ImNraHh2YXhxbzAwYnoydHBrNGhoYWxyeGcifQ.iTGbyMmXgga1AEQBZ_foow&limit=1'
    //console.log(geoUrl)
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            const feature = body.features[0]
            const latitude = feature.center[1]
            const longitude = feature.center[0]
            const placeName = feature.place_name;
            const data = {
                location: placeName,
                latitude: latitude,
                longitude: longitude
            }
            callback(undefined, data)
        }
    })
}

module.exports = getGeoCode