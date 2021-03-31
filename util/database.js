const Sequelize = require('sequelize');

const sequelize = new Sequelize('', '', '', {  // database, username, password
    dialect: 'mysql', 
    host: '', 
    port: '3306',
    logging: false}); 

module.exports = sequelize;