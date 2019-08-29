const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieW91cm9jayIsImEiOiJjank0ZXZwemoxNHJ5M25vaDNjYmlnMzhqIn0.AYwrL-bRfDQd7PNTUTzj0g&limit=1`;

    request({
        url,
        json: true
    }, (error, {body:data}) => {
        if (error) {
            callback('Unable to connect to location services!');
        } else if (data.message || data.features.length === 0) {
            callback('Unable to find location, try another search!');
        } else {
            const position = data.features[0].center;

            callback(undefined, {
                longitude: data.features[0].center[0],
                latitude: data.features[0].center[1],
                location: data.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
