const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const sequelize = require('../util/database');

const Schema = mongoose.Schema;

const machineSchema = new Schema({
  medicines:[
    {
      medicineId: { type: Schema.Types.ObjectId, ref: 'Medicine',required: true }, 
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
  ],

  cart: {
      medicines: [
          {
              medicineId: { type: Schema.Types.ObjectId, ref:'Medicine', required: true }, 
              quantity: { type: Number, required: true}
          }
      ]
  },

  sortByMedicine: {
    type: String,
    required: true
  }
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

  category: {
    type: String,
    required: true
  },

  machineIds: [
    {
      machineId: { type: Schema.Types.ObjectId, ref: 'Machine', required: true }
    }
  ]
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

machineSchema.methods.addMedicine = function(medicineInfo, targetName, targetQuantity) {
  let newQuantity = 1;
  console.log(targetQuantity);
  const medicineIndex = this.medicines.findIndex(medi => {
      return medi._id === medicineInfo._id;
  });
  const UpdatedMedicine = [...this.medicines];
  if (medicineIndex >= 0) {
      newQuantity = this.medicines[medicineIndex].quantity + Number(targetQuantity);
      UpdatedMedicine[medicineIndex].quantity = newQuantity;
  }   
  else {
      UpdatedMedicine.push({
          medicineId: medicineInfo._id,
          quantity: targetQuantity,
      });
  }
  const medicine = {
      medicines: UpdatedMedicine
  };
  this.medicines = medicine.medicines;
  return this.save();
}

machineSchema.methods.addToCart = function(medicineId){
  let newQuantity = 1;
  const medicineIndex = this.cart.medicines.findIndex(medi => {
      return medi.medicineId.toString() === medicineId._id.toString();
  });
  const updatedCartItems = [...this.cart.medicines];
  if (medicineIndex >= 0) {
      newQuantity = this.cart.medicines[medicineIndex].quantity + 1;
      updatedCartItems[medicineIndex].quantity = newQuantity;
  }   
  else {
    updatedCartItems.push({
          medicineId: medicineId._id,
          price: medicineId.price,
          quantity: 1,
      });
  }
  const updatedCart = {
      medicines: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
}

machineSchema.methods.removeFromCart = function(medicineId){
  const updatedCartMedicines = this.cart.medicines.filter(medi =>{
    return medi.medicineId.toString() !== medicineId.toString();
  });
  this.cart.medicines = updatedCartMedicines;
  return this.save();
}

machineSchema.methods.clearCart = function(){
  this.cart = {medicines: []};
  return this.save();
}

machineSchema.methods.changeMedicineStock = function(medicineInfos){
  const updatedMedicines = [...this.medicines];

  medicineInfos.forEach(medicineInfo => {
    const medicineIndex = this.medicines.findIndex(medi => {
      return medi.medicineId.toString() === medicineInfo.medicine._id.toString();
    });
    newQuantity = this.medicines[medicineIndex].quantity - 1;
    updatedMedicines[medicineIndex].quantity = newQuantity;
  })

  this.medicines = updatedMedicines;
  
  return this.save();
}

module.exports = {
    Machine: mongoose.model('Machine', machineSchema),
    Video: mongoose.model('Video', videoSchema),
    Medicine: mongoose.model('Medicine', medicineSchema)
    // pharmacists: Pharmacists
}