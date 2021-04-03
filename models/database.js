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

// const Pharmacists = sequelize.define('pharmacists', {
// Id: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     primaryKey: true
// },
// A: {
//     type: Sequelize.INTEGER,
//     allowNull: false
// },
// B: {
//     type: Sequelize.INTEGER,
//     allowNull: false
// },
// C: {
//     type: Sequelize.INTEGER,
//     allowNull: false
// },
// D: {
//     type: Sequelize.INTEGER,
//     allowNull: false
// }
// },
// {
// timestamps: false,
// freezeTableName: true,
// tableName : "pharmacists"
// });

module.exports = {
    medicines: Medicines,
    // pharmacists: Pharmacists
}