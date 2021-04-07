'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./utils/pass');

//älä tee näin projektissa

const app = express();
const port = 3000;

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};

//älä tee näin projektissa

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cookieParser());
app.use(session({
  secret: "irbinmkp+owerjimgvopvmsdfvdfv",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); //älä tee näin projektissa

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr, {httpOnly:true}).send('cookie set');
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('cookie');
  res.send('cookie deleted');
});


app.get('/form', (req, res) => {
  res.render('form');
});

//älä tee näin projektissa

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
    });

app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
