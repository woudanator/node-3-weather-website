const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/forecast');



const publicDirectoryPath = path.join(__dirname,'../public');
const pathToViews = path.join(__dirname,'../templates/views');
const pathToPartials = path.join(__dirname,'../templates/partials')
// Server Declaration
const app = express()
const port = process.env.PORT || 3000

app.set('view engine','hbs');
app.set('views',pathToViews);
hbs.registerPartials(pathToPartials)
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Reynhard Wouda'
    });
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide a valid location'
        });
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        } 
        weather(latitude,longitude,(error,{temperature,summary,temperatureMin,temperatureMax}={})=>{
            if (error){
                return res.send({error});
            }
            res.send({forcast:{temperature,summary,temperatureMin,temperatureMax},location});
        })
    })

    
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Us',
        name: 'Reynhard Wouda'
    }) 
});

app.get('/help',(req,res)=>{
    res.render('help',{
        pageName: 'Help & Support',
        title: 'Help Page',
        name: 'Reynhard Wouda',
        message: 'How can we help?'
    });
});

app.get('/help/*/',(req,res)=>{
    res.render('404',{
        title: '404 Error',
        name: 'Reynhard Wouda',
        error: 'help page could not be found'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Error',
        name: 'Reynhard Wouda',
        error: 'Page could not be found !'
    })
})

//app.com/help

//app.com/about

// app.com/weather


//Server Listener
app.listen(port,()=>{
    console.log(`Server has started on port ${port}.`)
});