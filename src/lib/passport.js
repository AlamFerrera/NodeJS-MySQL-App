const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,password,done) => {
    const rows = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.comparePassword(password,user.password);
      //  console.log(password);
        //console.log(validPassword);
       // return;
        if(validPassword) {
            done(null,user, req.flash('message', 'Bienvenido! ' + user.username));
        }
        else{
            done(null, false, req.flash('message', 'Contraseña Incorrecta'));
        }
    }
    else{
        return done(null,false, req.flash('message','El usuario ingresado no existe'));
    }
}));

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {fullname} = req.body;
    let newUser = {
        username,
        password,
        fullname
    }
    newUser.password = await helpers.encryptPassword(password);
    const result = await db.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, {newUser});

}));

passport.serializeUser((user,done) => {
    console.log(user.id);
    done(null,user.id);
});

passport.deserializeUser(async (id,done) => {
   const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
   done(null,rows[0]);
});