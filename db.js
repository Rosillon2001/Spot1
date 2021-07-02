const express = require('express');
const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.o1djg.mongodb.net/Melomano?retryWrites=true&w=majority', {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify: false, 
    useUnifiedTopology: true
} 
).then(db=>console.log('Conexion establecida con MongoDB'))
.catch(err=>console.error(err));