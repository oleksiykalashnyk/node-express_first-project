const fortune = require('./fortune');

//Main routs
exports.home = (req,res) => res.render('home');
exports.about = (req,res) => {
    res.render('about', {
        fortune: fortune.getFortune()
    })
}
exports.headers = (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)

    // cookie will be removed after 1 hours
    res.cookie("z",22,{
        expires: new Date(Date.now() + 1 * 3600000)
    })

    res.send(headers.join('\n'))


}
// Errors
exports.notFound = (req,res) => res.render('404')

/* eslint-disable no-unused-vars */
exports.serverError = (err,req,res,next) => res.render('500')
/* eslint-disable no-unused-vars */