const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/9366210a0fbeed293c502e5d0fff5ebe/${latitude},${longitude}?units=si`;


    request({
        url,
        json: true
    }, (error, {body:data}) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (data.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, data.daily.data[0].summary + ` It's currently ${data.currently.temperature} degrees out. There is a ${data.currently.precipProbability}% chance of rain`/*{
                string:
                temperature: data.currently.temperature,
                summary: data.daily[0].summary,
                chanceOfRain: data.currently.precipProbability
            }*/)
        }
    });
};

module.exports = forecast;
