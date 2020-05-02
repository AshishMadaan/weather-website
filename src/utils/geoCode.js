const request = require('request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW1hZGFhbiIsImEiOiJjazlsMXMydDYwMjF5M21wZzZjdzNqdHpxIn0.yUfVRdlJIzYRaFUnn39vPA&limit=1";

    request({url, json: true}, (error, { body }) => {
        if(error){
            console.log('Unable to connect to location service');
        }else if(!body.features){
            console.log('Unable to find location, try another search');
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
    });    
}

module.exports = geoCode;