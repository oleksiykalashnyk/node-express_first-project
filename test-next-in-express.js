const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log('\n\nZAWSZE')
    next()
})

app.get('/a', (req, res) => {
    console.log('/a: koniec trasy')
    res.send('a')
})
app.get('/a', (req, res) => {
    console.log('/a: nigdy nie zostanie wywołana');
})
app.get('/b', (req, res, next) => {
    console.log('/b: trasa nie zakończona')
    next()
})
app.use((req, res, next) => {
    console.log('CZASEM')
    next()
})
app.get('/b', (req, res, next) => {
    console.log('/b (część 2.): błąd' )
    throw new Error('niepowodzenie b')
})
app.use('/b', (err, req, res, next) => {
    console.log('/b wykryto błąd i przekazano dalej')
    next(err)
})

app.get('/c', (err, req) => {
    console.log('/c: błąd')
    throw new Error('niepowodzenie c')
})
app.use('/c', (err, req, res, next) => {
    console.log('/c: wykryto błąd, lecz nie przekazano dalej')
    next()
})

app.use((err, req, res, next) => {
    console.log('wykryto nieobsłużony błąd: ' + err.message)
    res.send('500 - Błąd serwera')
})

app.use((req, res) => {
    console.log('trasa nieobsłużona')
    res.send('404 - Nie znaleziono')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `Express został uruchomiony pod adresem http://localhost:${port}` +
    '; naciśnij Ctrl-C, aby zakończyć.'))
