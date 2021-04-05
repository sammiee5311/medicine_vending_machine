const path = require('path');

const mongoURL = '';
const machineId = '';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 3000;
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Machine = require('./models/database').Machine;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const externalMedRoutes = require('./routes/externalMedicalSupplies');
const generalMedRoutes = require('./routes/generalMedicine');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

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

app.use(errorController.get404);

sequelize.sync().then(result => {
    mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result =>{
        Machine.findOne().then(machine =>{
            if(!machine){
              const machine = new Machine({
                medicines: [],
                location: 'No Where',
                videos: []
              });
              machine.save();
            }
          });
        console.log('Connected!');
        app.listen(PORT);
    })
    .catch(err =>{
        console.log(err);
    })
})
.catch(err => {
    console.log(err);
});