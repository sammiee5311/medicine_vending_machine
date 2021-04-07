const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    medicines: [{
        medicine: { type: Object, required: true },
        quantity: { type: Number, required: true}
    }],
    machine: {
        machineId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Machine'
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);