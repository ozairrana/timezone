const request = require ('request')



geocode = (address,callback)=>
{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoib3phaXJyYW5hIiwiYSI6ImNrYThwZHVueDBmN2cycnBjdjYzOWt1ZmsifQ.cK8waPJN0OVk2rGNHeItDA"

    request({url,json:true},(error,respone)=>
    {
        if(error)
        {
            callback('Unable to connect to location services!',undefined)
        }
        else if(respone.body.features.length === 0)
        {
            callback('Unable to find location!',undefined)
        }
        else
        {
            callback(undefined,{loc: respone.body.features[0].place_name,lon: respone.body.features[0].center[0],lat: respone.body.features[0].center[1]})
        }
    })
}

module.exports = geocode