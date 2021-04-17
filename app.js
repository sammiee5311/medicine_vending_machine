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
var cors = require('cors')

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const externalMedRoutes = require('./routes/externalMedicalSupplies');
const generalMedRoutes = require('./routes/generalMedicine');
const adminRoutes = require('./routes/admin');

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

app.use(errorController.get404);

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
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
      io.emit('posts', { action: 'create', roomName: 'Pharmacist1'});
      io.emit('medicineList', ['606b0f628393482c4ccec9f8', '606b0f882c24732844a653c6']);
    });
    
})
.catch(err =>{
    console.log(err);
})

// sequelize.sync().then(result => {
// })
// .catch(err => {
//     console.log(err);
// });