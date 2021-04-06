const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const sequelize = require('../util/database');

const Schema = mongoose.Schema;

const machineSchema = new Schema({
  medicines:[
    {
      medicineId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Medicine',
        required: true
      },
      quantity: { type: Number, required: true}
    }
  ],

  location: {
    type: String,
    required: true
  },

  videos: [
    { 
      videoId: { 
        type: Schema.Types.ObjectId,
        ref: 'Video', 
        required: true
      }
    }
  ]
});

const medicineSchema = new Schema({
  name: { 
    type: String, 
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  dosageMethod: {
    type: String,
    required: true
  },
  
  imageUrl: {
    type: String,
    required: true
  },

  machines: { 
    machineId: { 
      type: Schema.Types.ObjectId,
      ref: 'Machine', 
      required: true
    }
  }
});

const videoSchema = new Schema({
  time: {
    type: Date,
    required: true
  },

  videoUrl: {
    type: String,
    required: true
  },

  machines: [
    { 
      machineId: { 
        type: Schema.Types.ObjectId,
        ref: 'Machine', 
        required: true
      }
    }
  ]
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
    Machine: mongoose.model('Machine', machineSchema),
    Video: mongoose.model('Video', videoSchema),
    Medicine: mongoose.model('Medicine', medicineSchema)
    // pharmacists: Pharmacists
}