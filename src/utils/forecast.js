const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherURL = 'http://api.weatherstack.com/current?access_key=e584d1537e4479e7cea98678077401a6&query=' + latitude + ',' + longitude + '&units=m'
    
    request({ url: weatherURL, json: true }, function (error, response, body) {
        if(error){
            callback("Unable to connect to the internet!", undefined)
            // console.log("Unable to connect to the internet!")
        }else if(response.body.error){
            callback("Unable to find location!", undefined)
            // console.log("Unable to find location!")
        }else{
            callback(undefined, response.body)
            // console.log(response.body.features[0].center[0])
            // console.log(response.body.features[0].center[1])
        }
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
    });
}

module.exports = forecast