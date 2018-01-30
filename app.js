
const express         = require('express')
const path            = require('path')
const exphbs          = require('express-handlebars')
const bodyParser      = require('body-parser')
const passport = require('passport')
const flash           = require('connect-flash')
const session         = require('express-session')
const app             = express()
const PORT            = process.env.PORT || 8080

// Load Routes
const ideas = require('./routes/ideas')
const users = require('./routes/users')

// Passport Config
require('./config/passport')(passport)

// Express Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// Static Path
app.use(express.static(path.join(__dirname, 'public')))

// Express Session Middleware
app.use(session({
    secret: 'keyboard_cat',
    resave: true,
    saveUninitialized: true
}))


// Passport Initialize Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Global Variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Index Route
app.get('/', (req, res) => {
    res.render('home')
})

// About Route
app.get('/about', (req, res) => {
    let title = 'Welcome to the about page'
    res.render('about', {title})
})


// User Routes
app.use('/ideas', ideas)
app.use('/users', users)


// Listen on port
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`)
})