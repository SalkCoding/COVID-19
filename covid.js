console.log('Loading Express')
const express = require('express')
const app = express()

console.log('Loading handlebars')
const handlebars = require('express-handlebars')

console.log('Loading cookie-parser')
const cookieParser = require('cookie-parser')

console.log('Loading serve-favicon')
const favicon = require('serve-favicon')

console.log('Loading morgan')
const morgan = require('morgan')

const path = require('path')
app.use(favicon(path.join(__dirname, 'public/icon', 'virus.ico')))
app.use(cookieParser())
app.use(morgan(':remote-addr :remote-user [:date[clf]] :status'))

const cityStateApi = require('./public/js/cityStateApi.js')
const worldStateApi = require('./public/js/worldStateApi.js')
const localMaskApi = require('./public/js/localMaskStateApi.js')

const loadAllData = async () => {
    cityStateApi.refreshState().then(() => console.log('City state loading completed'))
    worldStateApi.refreshState().then(() => console.log('World state loading completed'))
}

loadAllData()

//5 minutes for next refreshing
const timerId = setInterval(loadAllData, 300000)

process.on('beforeExit', (code) => {
    clearInterval(timerId)
    console.log(`Process exit with code ${code}`)
})

app.engine('.hbs', handlebars({
    defaultLayout: 'layout.hbs',
    extname: '.hbs',
}))
app.set('view engine', '.hbs')


app.use(express.static('public', {
    maxAge: '14400000'
}))


app.use('/confirmation', (req, res) => res.render('confirmation', cityStateApi.getState()))
app.use('/confirmation-global', (req, res) => res.render('confirmation-global', worldStateApi.getState()))
app.use('/masks/result', (req, res) => {
    localMaskApi.getMaskState(req.query).then((dictionary) => {
        res.render('masks', dictionary)
        console.log(`Search nearby masks store from lat : ${req.query.lat}, lng : ${req.query.lng}`)
    })
})
app.use('/masks/search', (req, res) => {
    res.render('location-search')
})
app.use('/masks', (req, res) => {
    const coordinate = req.cookies.coordinate
    if (coordinate) {
        const split = coordinate.split(', ')
        res.redirect(`/masks/result?lat=${split[0]}&lng=${split[1]}`)
    } else {
        //Default location(Seoul)
        res.redirect(`/masks/result?lat=37.5642135&lng=127.0016985`)
    }
})
app.use('/tips', (req, res) => res.render('tips'))
app.use('/tips-for-all', (req, res) => res.render('tips-for-all'))
app.use('/tips-for-symptoms', (req, res) => res.render('tips-for-symptoms'))

app.use('/', (req, res) => {
    res.render('index')
})

app.listen(3001)
console.log('Server listen with port 3001(http://127.0.0.1:3001)')