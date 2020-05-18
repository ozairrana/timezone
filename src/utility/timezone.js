const request = require ('request')

timezone = (lat,lon,callback) =>
{
    const url = "http://api.timezonedb.com/v2.1/get-time-zone?key=Y0Z9DRABZ799&format=json&by=position&lat=" + lat + "&lng=" + lon

    request({url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect to time zone services!',undefined)
        }
        else if(response.body.message)
        {
            callback('Unable to show time!',undefined)
        }
        else
        {
            callback(undefined,{dt:response.body.formatted})
        }
    })
}

module.exports = timezone