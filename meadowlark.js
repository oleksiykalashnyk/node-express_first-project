const express = require('express')
const expressHandlebars = require('express-handlebars')

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

//Generate random data in views
const fortunes = [
    ["Conquer your fears or they will conquer you.","Победите свои страхи, или они победят вас."],
    ["Rivers need springs.","Рекам нужны родники.","33333333.","444444444"],
    ["Do not fear what you don't know.","123"],
    "You will have a pleasant surprise.",
    []
]

app.get('/about', (req,res) => {
    const randomFortune = fortunes[Math.floor((Math.random()*fortunes.length))];
    res.render('about', {fortune:randomFortune});
})


// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage');
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