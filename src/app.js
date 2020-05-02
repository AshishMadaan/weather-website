const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');


const app = express();
const port  = process.env.PORT || 3000;

const publicDirectryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App!!',
        name: 'Ashish Madaan'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page!!',
        name: 'Ashish Madaan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'This is a help page!!',
        name: 'Ashish Madaan'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 404,
        errorMessage: 'Help article not found',
        name: 'Ashish'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            errorls: "You must provide an address!"
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, placeName} = {}) => {
        if(error){
           return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                placeName,
                address: req.query.address
            })
        })
    })

})

app.get('*', (req, res) => {
    res.render('404',{
        title: 404,
        errorMessage: 'Page not found!',
        name: 'Ashish'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port', port);
})
