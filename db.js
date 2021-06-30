const express = require('express');
const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/User', {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify: false, 
    useUnifiedTopology: true
} 
).then(db=>console.log('Conexion establecida con MongoDB'))
.catch(err=>console.error(err));