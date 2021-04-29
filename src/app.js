const path = require('path')
const express =  require('express')
const hbs =  require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.listen(3000, ()=> {
    console.log('Server is listening on port 3000')
})

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App Home',
        name: 'Zuher Abud',
    })
})
app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Weather App Help',
        name: 'Zuher Abud',
    })
})
app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'Weather App About',
        name: 'Zuher Abud',
    })
})
app.get('/weather', (req,res) =>{
    // res.send('<h1>Weather page</h1>')
    if (!req.query.address){
        return res.send('<h1>Please provide address</h1>')
    }
    // res.send({
    //     forecast: 'It is Snowing',
    //     location: req.query.address,
    // })
    geocode("\""+ req.query.address + "\"", (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error,
            })
        }
        forecast(latitude, longitude, (error, weatherData) => {
            if(error){
                return res.send({
                    error,
                })
            }

            res.send({
                Latitude: latitude,
                Longitude: longitude,
                Location: location,
                City: weatherData.location.name,
                Country:  weatherData.location.country,
                Temperatur: weatherData.current.temperature,
                Feels_like: weatherData.current.feelslike,
            })
        })
    })
})
app.get('/help/*', (req,res) =>{
    res.render('404', {
        title: '404',
        name: 'Zuher Abud',
        errorMessage: 'Help page not found'
    })
})
app.get('/*', (req,res) =>{
    res.render('404', {
        title: '404',
        name: 'Zuher Abud',
        errorMessage: 'Page not found'
    })
})




// const cityName = process.argv[2]

