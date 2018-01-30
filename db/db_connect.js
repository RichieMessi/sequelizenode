const Sequelize       = require('sequelize')

// SETUP SQQUELIZE
const connect_to_mysql = new Sequelize('heroku_a43926edad143bbs', 'b3743c2749fc58', '1e437529',{
    host: 'us-cdbr-iron-east-05.cleardb.net',
    dialect: 'mysql | clearDB'
})



module.exports = connect_to_mysql

