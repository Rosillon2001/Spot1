const express = require('express');
const mongoose= require('mongoose');
const morgan=require('morgan');

const app=express();
const port=3000;

//configuraciones
app.set('port', process.env.PORT || `${port}`)//toma el puerto configurado o cualquier otro disponible
 
//inicializacion del servidor express
app.listen(app.get('port'), ()=>{
  console.log('Server en el puerto', app.get('port'));
});