const request = require('request');



const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude + '&lon=' + longitude + '&units=imperial&appid=411ddd69dbcc2e3aaaa852fabb56ee6b';

    request({url, json: true}, (error, { body }) => {
        if(error){
            console.log('Unable to connect to weather service');
        }else if(body.error){
            console.log('Unable to find location, try another search');
        }
        else{
            callback(undefined,`It is currently ${body.current.temp} out there`);
        }
    });    
}

module.exports = forecast;