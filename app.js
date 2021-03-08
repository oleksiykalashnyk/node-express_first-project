const express = require('express')
const expressHandlebars = require('express-handlebars')
//Обработчик
const handlers = require('./lib/handlers')

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

// GET route
app.get('/', handlers.home)
app.get('/about', handlers.about)

app.use(handlers.notFound)
app.use(handlers.serverError)

app.listen(port, () => {
    console.log(`Express start work in the page http://localhost:${port};`)
})