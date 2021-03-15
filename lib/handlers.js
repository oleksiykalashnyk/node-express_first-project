const fortune = require('./fortune');
const unirest = require('unirest')

//Adds function for date
function getRealdata(x){
    const a = new Date(x);
    const date = {
        hour: a.getHours(),
        minute: a.getMinutes(),
        year: a.getFullYear(),
        month:a.getMonth()+1,
        day: a.getDate(),
    }
    if(date.minute == 0) date.minute = "00"
    return date
}

//Main routs
exports.home = (req,res) => res.render('home');

exports.about = (req,res) => {
    res.render('about', {
        fortune: fortune.getFortune()
    })
}


//cookie info
exports.cookie = (req,res) => {
    res.render('cookie',{
        layout:"custom"
    })
};

exports.aboutQueryInteger =  (req, res) => {
    if(Number.isInteger(+req.params.id)){
        res.render('about', {
            fortune:"Read more books",
            test: req.params.id
        })
    }
    res.render('about', {
        test: "Please use int in the searching"
    })
}

exports.weatherApi = (req,res) => {
    unirest
        .get('http://api.weatherapi.com/v1/current.json?key=dceec52001394e31860192221211403&q=Poznan&aqi=no')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .then((response) => {
            const lastUpdateTemp = getRealdata(response.body.current.last_updated)
            res.render('weatherApi',{
                layout: "custom",
                data: response.body,
                date: lastUpdateTemp
            })

        })

}
exports.weatherApiAllTimeInDay = (req,res) => {
    let city = req.params.city,
        getCity = req.query.city;

    if(!city){
        city = "Poznan"
    }
    if(getCity){
        city = getCity
    }

    unirest
        .get('https://api.weatherapi.com/v1/forecast.json?key=dceec52001394e31860192221211403&q='+city+'&days=1&aqi=no&alerts=no')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .then((response) => {
            const lastUpdateTemp = getRealdata(response.body.location.localtime)
            res.render('weatherApiAllTimeInDay',{
                layout: "custom",
                data: response.body,
                date: lastUpdateTemp,
                temp: response.body.forecast.forecastday[0].hour
            })

        })

}

exports.headers = (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
}



// Errors
exports.notFound = (req,res) => {
    res.render('404',{layout: "custom"})
}
/* eslint-disable no-unused-vars */
exports.serverError = (err,req,res,next) => res.render('500')
/* eslint-disable no-unused-vars */