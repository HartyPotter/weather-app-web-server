const path = require('path')
const x = require('express')
const hbs = require('hbs')
const utils = require('./utils.js')

const app = x()

// Define paths for Express
const publicDir = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

//setting handlebars engine and veiws location 
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
// set up static directory to serve
app.use(x.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Youssef"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Youssef"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Youssef",
        message: "You can send and receive text messages, photos, voice messages, and video using Messages. If you don't have Messages, you can get it from Google Play."
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address){
        return res.send({
            error: 'Must provide an address'
        })
    }

    utils.geoCode(address, (error, {lat: lat, lng: lng, loc: loc} = {}) => {
        if (error){
            return res.send({error})
        }
        else{
            utils.forecast(lat, lng, (error, forecast) => {
                if (error){
                    return res.send({error})
                }
                else{
                    return res.send({
                        forecast,
                        location: loc,
                        address
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Must provide search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: "Youssef",
        error: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: "Youssef",
        error: "404 Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is running!')
})