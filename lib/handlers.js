const fortune = require('./fortune');

const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
    '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
    '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

//Main routs
exports.home = (req,res) => {

    if(req.query.add === "xxxSession"){
        req.session.xxxSession = "Ok"
    }

    let xxxSession = req.session.xxxSession

    if(xxxSession){
        res.status(303)
        res.redirect('/about');
    }

    res.render('home')
}

exports.about = (req,res) => {
    // *** example cookies
    let deleteCookieOrSession = req.query.del

    if(deleteCookieOrSession === "xxx"){
        res.clearCookie('userid')
        res.status(303)
        res.redirect('/about');
    }

    if(deleteCookieOrSession == "xxxSession"){
        console.log(req.session.xxxSession)
        delete req.session.xxxSession
        res.status(303)
        res.redirect('/');
    }

    let xxx = req.signedCookies.userid

    if(!xxx || xxx == '') {
        res.cookie('userid', (Math.random()*10000).toFixed(0), {signed: true})
        res.status(303)
        res.redirect('/about');
    }

    res.render('about', {
        fortune: fortune.getFortune(),
        xxx: xxx
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
    const name = req.body.name || '', email = req.body.email || ''

    if(!VALID_EMAIL_REGEX.test(email)) {
        req.session.flash = {
            type: 'danger',
            intro: 'Validation error!',
            message: 'The email address you entered was not valid.',
        }
        return res.redirect(303, '/newsletter-signup')
    }else{
        req.session.flash = {
            type: 'success',
            intro: 'Super',
            message: 'All is ok',
        }
    }

    console.log('Token CSRF: ' + req.body._csrf)

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

// Errors
exports.notFound = (req,res) => {
    res.status(404)
    res.render('404',{layout: "full_page"})
}
/* eslint-disable no-unused-vars */
exports.serverError = (err,req,res,next) => {
    res.status(500)
    res.render('500')
}
/* eslint-disable no-unused-vars */