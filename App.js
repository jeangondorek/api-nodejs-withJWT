const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");

const url = require('./Config/MongoConfig');

const mongoose = require("mongoose");

mongoose.connect(url);

mongoose.connection.on('error', (err)=>{
    console.log("Erro na conexão", + err);
})

mongoose.connection.on('disconnected', ()=>{
    console.log("App desconectada");
})

mongoose.connection.on('connected', ()=>{
    console.log("App connectada");
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(port)

module.exports = app;