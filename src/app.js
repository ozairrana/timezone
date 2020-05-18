const path = require('path')
const geocode = require('./utility/geocode.js')
const timezone = require('./utility/timezone.js')
const hbs = require('hbs')
const express = require('express')

const port = process.env.PORT || 3000 

const app = express()
const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('main',{
        title: "TIME-ZONE",
        name: "Ozair"
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title: "HELP",
        msg: 'For help contact at ozair_rana@hotmail.com',
        name: "Ozair"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "ABOUT",
        aboutme: "I am Ozair Rana studying BSCS from FAST-NUCES.",
        name: "Ozair"
    })
})

app.get('/timezone',(req,res)=>
{  
    if(!req.query.address)
    {
        return res.send({
            error:"Please provide an address!"
        })
    }
    else
    {
        geocode(req.query.address,(error,{loc,lat,lon} = {})=>
        {
            if(error === undefined)
            {
                timezone(lat,lon,(error,{dt}= {})=>{
                    if(error === undefined)
                    {
                        res.send({
                           Location: loc,
                           DateTime: dt
                        })
                    }
                    else
                    {
                        res.send({
                            error: error
                        })
                    }
                })
            }
            else
            {
                res.send({
                    error:error
                })
            }
        })
    }  
})


app.get('*',(req,res)=>{
    res.render('404',{
        title: "404 error!",
        name:"Ozair"
    })
})

app.listen(port,()=>{
    console.log('The server is up on port:  '+port)
})