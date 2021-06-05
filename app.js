const path = require('path');

const mongoURL = '';
const machineId = '';

import express from 'express';
import mongoose from 'mongoose';
import errorController from './controllers/error.js';
import sequelize from './util/database.js';
import cors from 'cors';

const Machine = require('./models/database').Machine;
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

import externalMedRoutes from './routes/externalMedicalSupplies';
import generalMedRoutes from './routes/generalMedicine';
import adminRoutes from './routes/admin';

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use((req, res, next) => {
    Machine.findById(machineId)
      .then(machine => {
        req.machine = machine;
        next();
      })
      .catch(err => console.log(err));
});

app.use(externalMedRoutes);
app.use(generalMedRoutes);
app.use('/admin', adminRoutes);

app.use(errorController);

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result =>{
    Machine.findOne().then(machine =>{
        if(!machine){
          const machine = new Machine({
            medicines: [],
            location: 'No Where',
            videos: [],
            cart: { 
              medicines: [ ] 
            },
            sortByMedicine: "all"
          });
          machine.save();
        }
      });
    const server = app.listen(PORT);
    console.log('Connected!');   
})
.catch(err =>{
    console.log(err);
})

// sequelize.sync().then(result => {
// })
// .catch(err => {
//     console.log(err);
// });