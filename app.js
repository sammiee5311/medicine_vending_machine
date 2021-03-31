const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8080;

const sequelize = require('./util/database');
const Database = require('./models/machine');


/*
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
*/

Database.medicines.create({
    // column name: value
  }).then(result =>{
    console.log('created sccuessfully.');
  }).catch(err =>{
    console.log(err)
});

/*
sequelize.sync().then(result => {
    app.listen(PORT);
})
.catch(err => {
    console.log(err);
});
*/