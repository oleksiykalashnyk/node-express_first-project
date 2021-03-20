const express = require('express')
const expressHandlebars = require('express-handlebars')

const bodyParser = require('body-parser')
const multiparty = require('multiparty')

const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

//Secret code for cookie
const credentials = require('./credentials')
//Обработчик
const handlers = require('./lib/handlers')
//МидлВеер - посредник
const weatherMiddleware = require('./lib/middleware/weather')
const flashMiddleware = require('./lib/middleware/flash')


const app = express()

//settings handlebars and add new functions
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    helpers:{
        // Function to do basic mathematical operation in handlebar
        math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        },
        //Function "Section"
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    }
}))
app.set('view engine', 'handlebars')

// *** Use cache in the app
// app.set('view cache', true)

// *** Off  the header what is app used express server
app.disable('x-powered-by')

// *** Use Cookie-Session and add config data
app.use(cookieSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}))
// *** Use Cookie-parser vs secret code
app.use(cookieParser(credentials.cookieSecret))

// *** Encode form body from POST data (OLD TYPE -- if you use Express.js version 4.16+ dont need this packed)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//// !!! Encode form body from POST data (NEW TYPE -- if you use Express.js version 4.16+)
// app.use(express.json())
// app.use(express.urlencoded())

//Set public folder
app.use(express.static(__dirname+'/public'))

//Set PORT
const port = process.env.PORT || 3000

//Middlware
app.use(weatherMiddleware)
app.use(flashMiddleware)

// GET routes
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/cookie', handlers.cookie)

// FORM browser method POST
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// FORM fetch/JSON method
app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.apiNewsletter)


// FORM use multiparty
app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestThankYou)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return handlers.vacationPhotoContestError(req, res, err.message)
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})
// FORM use multiparty fetch/JSON method
app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return handlers.vacationPhotoContestError(req, res, err.message)
        handlers.vacationPhotoContestProcessAjax(req, res, fields, files)
    })
})





app.use(handlers.notFound)
app.use(handlers.serverError)

if(require.main === module) {
    app.listen(port, () => {
        console.log( `Express start work in the page http://localhost:${port};` )
    })
} else {
    module.exports = app
}
