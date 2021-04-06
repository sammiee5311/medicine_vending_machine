const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const sequelize = require('../util/database');

const Schema = mongoose.Schema;

const machineSchema = new Schema({
  medicines:[
    {
      name: { 
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: { 
        type: Number, 
        required: true
      },
      imageUrl: { 
        type: String, 
        required: true
      },
      description: { 
        type: String, 
        required: true
      }
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

  machineId: { 
    type: Schema.Types.ObjectId,
    ref: 'Machine', 
    required: true
  }
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

machineSchema.methods.addMedicine = function(medicineInfo, machine, targetName, targetQuantity) {
  const targetPrice = medicineInfo.price;
  const targetImageUrl = medicineInfo.imageUrl;
  const targetDescription = medicineInfo.description;
  let newQuantity = 1;
  const medicineIndex = this.medicines.findIndex(medi => {
      return medi.name === targetName;
  });
  const UpdatedMedicine = [...this.medicines];
  if (medicineIndex >= 0) {
      newQuantity = this.medicines[medicineIndex].quantity + Number(targetQuantity);
      UpdatedMedicine[medicineIndex].quantity = newQuantity;
  }   
  else {
      UpdatedMedicine.push({
          name: targetName,
          price: targetPrice,
          quantity: targetQuantity,
          imageUrl: targetImageUrl,
          description: targetDescription
      });
  }
  const medicine = {
      medicines: UpdatedMedicine
  };
  this.medicines = medicine.medicines;
  return this.save();
}

module.exports = {
    Machine: mongoose.model('Machine', machineSchema),
    Video: mongoose.model('Video', videoSchema),
    Medicine: mongoose.model('Medicine', medicineSchema)
    // pharmacists: Pharmacists
}