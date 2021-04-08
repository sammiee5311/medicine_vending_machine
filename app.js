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

var server = require('http').createServer(app);

var io = require('socket.io')(server);

const externalMedRoutes = require('./routes/externalMedicalSupplies');
const generalMedRoutes = require('./routes/generalMedicine');
const adminRoutes = require('./routes/admin');

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
            }
          });
          machine.save();
        }
      });
      io.on('connection', socket => {
        socket.on('login', data => {
          console.log('Client logged-in:\n name: ' + data.name + '\n userid: ' + data.userId);
          socket.name = data.name;
          socket.userId = data.userId;
        });
      
        // get msg from client
        socket.on('chat', data => {
          console.log('Message from %s: %s', socket.name, data.msg);
        });

        socket.on('disconnect', () => {
          console.log('disconnected: ' + socket.name);
        });
      });
      server.listen(PORT, () => {
        console.log('Connected!');
      });
    // app.listen(PORT);
})
.catch(err =>{
    console.log(err);
})

// sequelize.sync().then(result => {
// })
// .catch(err => {
//     console.log(err);
// });