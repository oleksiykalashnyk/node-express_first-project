const express = require('express')
const expressHandlebars = require('express-handlebars')

//exports privet modules
const fortune = require('./lib/fortune');

const app = express()
//settings handlebars
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
        }}
}))
app.set('view engine', 'handlebars')

//Set public folder
app.use(express.static(__dirname+'/public'))

//Set PORT
const port = process.env.PORT || 3000

// GET method route
app.get('/', (req,res) => res.render('home'));

app.get('/about', (req,res) => {
    res.render('about', {fortune:fortune.getFortune()});
})


// POST method route
app.post('/', function (req, res) {
    res.json({"foo": "bar"});
})


//If  not are page (404)
app.use((req,res) => {
    res.status(404)
    res.render('404')
})

//If 500 Not are standard page
app.use((err,req,res,next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => {
    console.log(`Express start work in the page http://localhost:${port};`)
})