const express = require('express');
const mongoose= require('mongoose');
const morgan=require('morgan');
const path=require('path');
const expresshbs=require('express-handlebars');
const methOverr=require('method-override');
const expsession=require('express-session');

const app=express();
const port=3000;

//configuraciones
app.set('port', process.env.PORT || `${port}`)//toma el puerto configurado o cualquier otro disponible

app.use(express.static(__dirname + '/public/assets'));

app.set('views', path.join (__dirname, '/public/assets/views'));
app.engine('.hbs', expresshbs({
  defaultLayout: 'main',//establece la plantilla predeterminada
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'

}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methOverr('_method'));
app.use(expsession({
  secret:'Hola',
  resave: true,
  saveUninitialized: true
}));

//rutas de acceso
app.use(require('./backend/routes/index'));
app.use(require('./backend/routes/usermgn'));


//conexion con mongodb
require('./db');
//inicializacion del servidor express
app.listen(app.get('port'), ()=>{
  console.log('Server en el puerto', app.get('port'));
});
