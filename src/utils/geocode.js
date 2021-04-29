const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoienVoZXJhYnVkIiwiYSI6ImNrbnI4ajhoNzAwdnkyeW83ZDBpY2t0dzMifQ.NfFW2sQNlSVOBDptNLNQKw&limit=1'
    
    request({ url: geocodeURL, json: true }, function (error, response, body) {
        if(error){
            callback("Unable to connect to location services", undefined)
            console.log("Unable to connect to the internet!")
        }else if(response.body.features.length === 0){
            callback("Unable to connect to location services", undefined)
            console.log("Unable to find location!")
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
            // console.log(response.body.features[0].center[0])
            // console.log(response.body.features[0].center[1])
        }
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
    });
}

module.exports = geocode