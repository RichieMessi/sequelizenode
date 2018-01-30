const Sequelize = require('sequelize')
const connect_to_mysql = require('../db/db_connect')


const User = connect_to_mysql.define('user', {
    name: Sequelize.TEXT,
    email: Sequelize.TEXT,
    password: Sequelize.TEXT
    }
)

connect_to_mysql.sync()

module.exports = User