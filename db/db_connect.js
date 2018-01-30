const Sequelize       = require('sequelize')

// SETUP SQQUELIZE
const connect_to_mysql = new Sequelize('DATABASE_URL', 'b3743c2749fc58', '1e437529'
,{
    host: 'CLEARDB_DATABASE_URL',
    dialect: 'mysql'
}
) 



module.exports = connect_to_mysql

