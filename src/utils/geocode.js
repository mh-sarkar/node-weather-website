const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWgtc2Fya2FyIiwiYSI6ImNrazNzYTZqOTFlankyeHBlcmhxNms2bDMifQ.kt5JCdCbAKQblszkOcK1jQ&limit=1'

    request({ url, json: true }, (error, response) => {

        if (error) {
            callback("Unable to connect geocode!", undefined)
        } else if (response.body.features.length === 0) {
            callback("Location isn't found! Try another location.", undefined)
        } else {
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const place = response.body.features[0].place_name

            const data = {
                latitude,
                longitude,
                place
            }

            callback(undefined, data)

        }

    })

}

module.exports = geocode