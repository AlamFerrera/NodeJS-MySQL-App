const express = require('express');
const morgan = require('morgan');

//inicializaciones
const app = express();

//configuraciones
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));

