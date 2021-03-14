const fortune = require('./fortune');

//Main routs
exports.home = (req,res) => res.render('home');

exports.about = (req,res) => {
    res.render('about', {
        fortune: fortune.getFortune()
    })
}
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