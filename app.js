const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')

//Обработчик
const handlers = require('./lib/handlers')
//МидлВеер - посредник
const weatherMiddlware = require('./lib/middleware/weather')

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

//Use cache in the app
// app.set('view cache', true)

//Encode form body from POST data (OLD TYPE -- if you use Express.js version 4.16+ dont need this packed)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//// !!! Encode form body from POST data (NEW TYPE -- if you use Express.js version 4.16+)
// app.use(express.json())
// app.use(express.urlencoded())

//Set public folder
app.use(express.static(__dirname+'/public'))

//Set PORT
const port = process.env.PORT || 3000

//Off  the header what is app used express server
app.disable('x-powered-by')

//Middlware
app.use(weatherMiddlware)

// GET routes
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/cookie', handlers.cookie)
app.get('/headers',handlers.headers)

// FORM browser method
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


//GET test
app.get('/about/:id', handlers.aboutQueryInteger)
app.get('/weatherApi', handlers.weatherApi)
app.get('/weatherApiAllTimeInDay', handlers.weatherApiAllTimeInDay)
app.get('/weatherApiAllTimeInDay/:city', handlers.weatherApiAllTimeInDay)

//API GET routes

//_Response JSON
let tours = [
    {id:0, name: "Hood River", price: 99.99},
    {id:1, name: "Oregon Coast", price: 149.96}
]
app.get('/api/tours_json', (req,res) => res.json(tours))

//_Response XML
app.get('/api/tours_xml', (req, res) => {
    const toursXml = '<?xml version="1.0"?><tours>' +
        tours.map(p =>
            `<tour price="${p.price}" id="${p.id}">${p.name}</tour>`
        ).join('') + '</tours>'
    const toursText = tours.map(p =>
        `${p.id}: ${p.name} (${p.price})`
    ).join('\n')
    res.format({
        'application/json': () => res.json(tours),
        'application/xml': () => res.type('application/xml').send(toursXml),
        'text/xml': () => res.type('text/xml').send(toursXml),
        'text/plain': () => res.type('text/plain').send(toursXml),
    })
})


//API POST routes
app.post('/api/process-contact', (req,res) => {
    if(req.body.name  && req.body.email){
        res.status(303)
        res.send(req.body.name + "  " +  req.body.email)
        res.json({
            username: req.body.name,
            user_email: req.body.email
        })
    }
    res.status(404)
    res.json({
        message: "Error, you must send name and email"
    })
})

app.post('/api/tour', (req, res) => {
    let p = {
        id: tours[tours.length-1].id+1,
        name : "",
        price: ""
    }
    if(req.body.name) p.name = req.body.name
    if(req.body.price ) p.price = parseInt(req.body.price)
    tours.push(p)
    console.log(tours)
    res.json({
        success: true,
        name: p.name,
        price: p.price
    })
})


//API PUT routes
app.put('/api/tour/:id', (req, res) => {
    const p = tours.find(p => p.id === parseInt(req.params.id))
    if(!p) return res.status(410).json({ error: 'Error path' })
    if(req.body.name) p.name = req.body.name
    if(req.body.price) p.price = req.body.price
    console.log(tours)
    res.json({
        success: true,
        name: p.name,
        price: p.price
    })
})

//API DELETE routes
app.delete('/api/tour/:id', (req, res) => {
    const idx = tours.findIndex(tour => tour.id === parseInt(req.params.id))
    if(idx < 0) return res.json({ error: 'No such tour exists.' })
    tours.splice(idx, 1)
    console.log(tours)
    res.json({ success: true })
})




//Without layout
app.get('/test_without_layout', (req,res) => {
    res.render('test',{layout: null},)
})

const testData = {
    currency:{
        name: "Dollar",
        abbrev: "USD"
    },
    tours : [
        {id:0, name: "Hood River", price: 99.99},
        {id:1, name: "Oregon Coast", price: 149.96}
    ],
    specialURL: "/",
    currencies: ["USD","PLN","RUB"]
}
//Custom layout
app.get('/test_custom_layout', (req,res) => {
    res.render('test',{data:testData,layout: 'custom'})
})



app.get('/500', (req,res) => {
    res.render('500')
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
