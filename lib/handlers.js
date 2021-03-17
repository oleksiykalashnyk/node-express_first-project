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
exports.home = (req,res) => res.render('home')

exports.about = (req,res) => {
    res.render('about', {
        fortune: fortune.getFortune()
    })
}


//Forms newsletter
exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup',{
        csrf:"token CSRF 1234567890"
    })
}
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')
exports.newsletterSignupProcess = (req, res) => {
    console.log('Token CSRF: ' + req.body._csrf)
    console.log('Name: ' + req.body.name)
    console.log('Email: ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}


exports.newsletter = (req, res) => {
    res.render('newsletter', { csrf: 'token CSRF 1234567890' })
}
exports.apiNewsletter = (req, res) => {
    console.log('Token CSRF: ' + req.body._csrf)
    console.log('Name: ' + req.body.name)
    console.log('Email: ' + req.body.email)
    res.send({ result: 'success' })
}

//*** Form files
exports.vacationPhotoContest = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo', { csrf: 'token CSRF 1234567890', year: now.getFullYear(), month: now.getMonth() })
}
exports.vacationPhotoContestThankYou = (req, res) => res.render('contest/vacation-photo-thank-you')
exports.vacationPhotoContestError = (req, res, message) => {
    res.send({ result: 'error', error: message })
}
exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.redirect(303, '/contest/vacation-photo-thank-you')
}

// fetch/Ajax example
exports.vacationPhotoContestAjax = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() })
}
exports.vacationPhotoContestProcessAjax = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.send({ result: 'success' })
}


//cookie info
exports.cookie = (req,res) => {
    res.render('cookie',{
        layout: "full_page"
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
    res.status(404)
    res.render('404',{layout: "custom"})
}
/* eslint-disable no-unused-vars */
exports.serverError = (err,req,res,next) => {
    res.status(500)
    res.render('500')
}
/* eslint-disable no-unused-vars */