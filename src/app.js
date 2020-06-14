const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather APp'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nishi',
        helpText: 'Some Help Text'
    });
})

app.get('/about', (req, res) => {
    res.render('about',{
        name: 'Nishi Ajmera',
        title: 'About'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
      return  res.send({
            error: 'Please provide an address'
        });
    }
    const address = req.query.address
    geocode(address, (error, {longitude, latitude, location} = {})=>{
     if(error){
         return res.send({
             error
         })
     }else{
         forecast(latitude, longitude, (error, resp)=>{
            if(error) {
                return res.send({
                    error
                })
            }else{
                return res.send({
                    resp
                })
            }
         })
     }

    })
    
})

app.get('/help/*', (req, res)=>{
    res.render('404page', {
        title: 'Weather App',
        name: 'Nishi ajmera', 
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404page', {
        title: 'Weather App',
        name: 'Nishi ajmera', 
        errorMessage:'Page not found'
    })
})


app.listen('3002', () => {
    console.log('server is up at port 3002');
})