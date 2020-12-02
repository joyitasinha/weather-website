const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const getGeoCode = require('./utils/geocode.js')
const getForecast = require('./utils/forecast.js')

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'J.S.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather',
        name: 'J.S.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather Help',
        name: 'J.S',
        helpText: 'Some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address has to be specified'
        })
    }
    getGeoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        
        getForecast(latitude, longitude, 'm', (error, forecastData) => {
            if (error) {
                return res.send({error})  
            } 
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search must be specified'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageError', {
        title: '404',
        name: 'J.S',
        errorText: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('pageError', {
        title: '404',
        name: 'J.S',
        errorText: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})