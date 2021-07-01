const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const { database } = require('./keys.js');
const passport = require('passport');

//inicializaciones
const app = express();
require('./lib/passport');

//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'nodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    next();
});

//Rutas
app.use(require('./routes/routes.index'));
app.use(require('./routes/auth'));
app.use('/links', require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log("Servidor iniciado en el puerto ", app.get('port'));
});