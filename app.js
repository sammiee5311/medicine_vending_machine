const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const PORT = 3000;
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const externalMedRoutes = require('./routes/externalMedicalSupplies');
const generalMedRoutes = require('./routes/generalMedicine');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(externalMedRoutes);
app.use(generalMedRoutes);


app.use(errorController.get404);

sequelize.sync().then(result => {
    // console.log(result);
    app.listen(PORT);
})
.catch(err => {
    console.log(err);
});