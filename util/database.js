const Sequelize = require('');

const sequelize = new Sequelize('', '', '', {  // database, username, password
    dialect: '', 
    host: '', 
    port: '',
    logging: false}); 

module.exports = sequelize; 