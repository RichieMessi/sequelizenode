const express           = require('express')
const router            = express.Router()
const Sequelize         = require('sequelize')
const connect_to_mysql  = require('../db/db_connect')
const Article           = require('../models/Article')
const { ensureAuthenticated} = require('../helpers/auth')


// Post.update({ updatedAt: null,}, {where: {deletedAt: {[Op.ne]: null}}});

// Idea Index Page
router.get('/', ensureAuthenticated, (req, res) => {
    Article.findAll({where: {user: req.user.id}}, {order: [['updatedAt', 'DESC']] })
        .then((ideas) => {
        res.render('ideas/index', {
            ideas: ideas
        })
    })
})

// Add Idea Form GET
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add')
})

// Add Idea Route POST
router.post('/', ensureAuthenticated, (req, res) => {
    let errors = []

    if(!req.body.title){
        errors.push({text: 'Please enter the Title'})
    } 
    if(!req.body.details){
        errors.push({text: 'Please enter Details'})
    }
    if(errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    } else {

        const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        }
        new Article(newUser).save().then(() => {
            req.flash('success_msg', 'Idea Added')            
            res.redirect('/ideas')
        })
    }
})

// Edit Idea Form GET
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Article.findOne({
        where: {id: req.params.id}
    })
    .then((idea) => {
        res.render('ideas/edit', {
            idea: idea
        })
        console.log(req.params.id)
        console.log(idea.id)              
    })


})

// EDIT POST
router.post('/:id', ensureAuthenticated, (req, res) => {
    Article.findOne({
        where: {id: req.params.id}
    })
        .then((idea) => {

            if(idea.user != req.user.id){
                res.flash('error_msg', 'Unauthorized')
            } else {

            }


            idea.updateAttributes({
                title : req.body.title,
                details : req.body.details
            }).then((idea) => {
            req.flash('success_msg', 'Idea Updated')
                res.redirect('/ideas')
            })
        })
})



// DELETE REQUEST

router.post('/delete/:id', ensureAuthenticated, (req, res) => {

    Article.destroy({
        where: {id: req.params.id}
    })
        .then((idea) => {
            console.log(req.params.id)
            // idea.destroy({})
        }).then((idea) => {
            req.flash('success_msg', 'Idea Removed')
            res.redirect('/ideas')
        })
})


module.exports = router