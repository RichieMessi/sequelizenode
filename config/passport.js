const LocalStrategy = require('passport-local').Strategy
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')


// Load user model
const User = require('../models/User')


module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        // Check Username exists in database
        User.findOne({
            where: {email: email}
        }).then((user) => {
            if(!user){
                return done(null, false, {message: 'No User Found'})  // sequence: (error, user, message)
            }

            // Bcrypt Matches Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Password does not Match'})
                }
            })
        })
    }))

    // Passport Serialize / Deserialize
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done){
        User.findById(id).then(function(user) {
 
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        })
    })
}