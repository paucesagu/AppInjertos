const express= require('express');
const morgan = require('morgan');   
const cors = require('cors');

const injertosRoutes = require('./routes/injertosRoutes');
const autenticacionRoutes = require('./routes/autenticacionRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const reentrenarRoutes = require('./routes/reentrenarRoutes');


const app = express();


app.set("port", 8000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(autenticacionRoutes);
app.use(injertosRoutes);
app.use(usuariosRoutes);
app.use(reentrenarRoutes);


module.exports = app;
