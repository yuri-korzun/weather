const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = rocess.env.PORT || 3000;

// Define path for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yury'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Yury'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        message: 'lorem ipsum',
        name: 'Yury'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                address,
                location,
                forecast: forecastData
            });
        });
    });



});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help page',
        message: 'Help article not found',
        name: 'Yury'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: 'Page not found',
        name: 'Yury'
    });
});

app.listen(port, () => console.log(`server started on port ${ port }`));
