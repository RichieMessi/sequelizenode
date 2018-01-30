const Sequelize = require('sequelize')
const connect_to_mysql = require('../db/db_connect')


const Article = connect_to_mysql.define('idea', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    user: {
        type: Sequelize.STRING,
        allowNull: false
    }
    // title: Sequelize.TEXT,
    // details: Sequelize.TEXT
    }
)
connect_to_mysql.sync()

module.exports = Article