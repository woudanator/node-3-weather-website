const request = require('request');

const geocode = function(address,callback){

    const access_token = 'pk.eyJ1Ijoid291ZGFudG9yIiwiYSI6ImNqdHVrdzBwNjA2bXg0NXBsdmV0YmxibnoifQ.AQeCsPA0RduHLJe8Zd80ww';
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token='+access_token;
    request({url:url,json:true},(error,{body})=>{
            if(error){
                callback('Can not connect to StarSat Station...',undefined);
            }else if(body.features.length === 0){
                callback('Location could not Be Traced',undefined)
            }else{
                callback(undefined,{
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name});
            }
            })
}

module.exports = geocode;