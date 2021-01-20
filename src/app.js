const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const app = express()

//define path for express config
const publicDiractoryPath = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)

// Setup static directory to serve
app.use(express.static(publicDiractoryPath))

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        headline: "Home Page",
        content: "hello! What's going on?",
        name: "Mehedi"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: "This is help message!",
        name: "Mehedi"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        headline: "About Page",
        content: "hello! What's going on?",
        name: "Mehedi"
    })
})

// app.get('/about',(req, res)=>{
//     res.send("About Page")
// })

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({ error: "Enter a location!" })
    }

    geocode(req.query.address, (error, response) => {
        if (error) { 
            return res.send({ error})
        }
        // console.log("Response: ", response)
        res.send(response)
    })

    console.log(req.query)


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help Article not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is running on...')
})