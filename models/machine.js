const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Medicines = sequelize.define('medicines', {
  machineId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  A: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  B: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  C: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  D: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},
{
  timestamps: false,
  freezeTableName: true,
  tableName : "medicines"
});

module.exports = {
    medicines: Medicines
}