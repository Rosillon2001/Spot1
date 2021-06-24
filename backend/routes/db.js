const express = require('express');
const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/User', {
    useNewUrlParser:true
}
).then(db=>console.log('Conexion establecida con MongoDB'))
.catch(err=>console.error(err));