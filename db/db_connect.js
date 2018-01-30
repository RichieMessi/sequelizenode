const Sequelize       = require('sequelize')

// SETUP SQQUELIZE
const connect_to_mysql = new Sequelize('note_ideas', 'b3743c2749fc58', '1e437529',{
    host: 'us-cdbr-iron-east-05.cleardb.net',
    dialect: 'heroku_a43926edad143bb'
})



module.exports = connect_to_mysql

