'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//ÄLÄ TEE NÄIN PROJEKTISSA

const app = express();
const port = 3000;

const username = 'foo';
const password = 'bar';

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cookieParser());
app.use(session({
  secret: "irbinmkp+owerjimgvopvmsdfvdfv",
  resave: false,
  saveUninitialized: true
}));

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

app.get('/secret', (req, res) => {
  if(req.session.logged) {
    res.render('secret');
  }else{
    res.redirect('/form');
  }

});

//ÄLÄ TEE NÄIN PROJEKTISSA

app.post('/login', (req, res) => {
  const passwd = req.body.password;
  const uname = req.body.username;
  if(uname === username && passwd === password) {
    req.session.logged = true;
    res.redirect('/secret');
  }else{
    res.redirect('/form');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
