const request =  require('request');

var forecast = function(latitude,longitude,callback){

request({url:'https://api.darksky.net/forecast/c543477a3eccfddc39deb03c46037898/'+latitude+','+longitude+'?units=si',json:true},(error,{body})=>{
   if(error){
       callback('Unable to Connect to the Weather Station',undefined);
   }else if(body.error){
       callback('Unable to Pinpoint your Loctaion try again',undefined);
   }else{
        callback(undefined,{
            temperature: body.currently.temperature,
            summary : body.daily.data[0].summary,
            temperatureMin: body.daily.data[0].temperatureMin,
            temperatureMax: body.daily.data[0].temperatureMax
        })
   }  
})


}

module.exports = forecast