
const express = require('express')
const homeRoute =require ('./routes/home');
const mongoose = require('mongoose');
const Club = require('./models/club');
const bodyParser= require('body-parser')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/crud_demo',{useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',() => console.log('something went wrong while connecting to database'));
db.once('open',()=> {
  console.log('DB connection was successful');
})

app.set('view engine','ejs');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/',homeRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})