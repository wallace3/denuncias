const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
const nodemoon = require('nodemon')
const bodyParser = require('body-parser');
const expedienteRoutes = require('./routes/expedienteRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');


const dbUri = "mongodb+srv://denuncias-admin:Bigsteal2023@cluster0.t8yfevh.mongodb.net/denuncias-bd?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(cors({
    origin:"http://localhost:3001"
}));

//MIDDLEWARE static FILEs
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use('/expediente', expedienteRoutes);
app.use('/usuarios', usuariosRoutes);

mongoose.connect(dbUri, {useNewUrlParser:true,  useUnifiedTopology: true})
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err));


