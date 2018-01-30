const Sequelize       = require('sequelize')

// SETUP SQQUELIZE
const connect_to_mysql = new Sequelize('note_ideas', 'root', '12345',{
    host: 'localhost',
    dialect: 'mysql'
})



module.exports = connect_to_mysql

