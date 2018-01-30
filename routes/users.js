

const express           = require('express')
const router            = express.Router()
const Sequelize         = require('sequelize')
const bcrypt            = require('bcryptjs')
const passport          = require('passport')
const User              = require('../models/User')

// User Login Route GET
router.get('/login', (req, res) => {
    res.render('users/login')
})

// User Login POST
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
    req.flash('success_msg', 'Log in Successful' )
})

// User Register Route GET
router.get('/register', (req, res) => {
    res.render('users/register')

})


// User Registration POST
router.post('/register', (req, res) => {
    let errors = []
    if(req.body.password != req.body.password2){
        errors.push({text: 'Passwords do not match'})
    }

    // if(req.body.password.length < 5){
    //     errors.push({text: 'Password must be atleast 4 characters'})
    // }

    if(errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        })
    } else {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const saltRounds = 10
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                // Store hash in your password DB.
                newUser.password = hash
                console.log(newUser)
                User.create(newUser)
            })
        })
        req.flash('success_msg', 'You are now registered and can log in' )
        res.redirect('/users/login')
    }
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Logout Successful')
    res.redirect('/users/login')
})


module.exports = router
