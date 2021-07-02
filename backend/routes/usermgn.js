const router = require('express').Router();

const user = require('../models/users.js')

router.get('/login', (req, res)=>{
    res.render('partials/login');
});

router.get('/register', (req, res)=>{
    res.render('partials/register');
});

router.post('/register', async(req, res)=>{
    console.log(req.body);
    const {username, password, type} = req.body;
    //console.log(username);
    //console.log(password);

    //manejo de errores
    const errors=[];
    if(!username){
        errors.push({text: "Por favor ingrese un usuario"});
    }
    if(!password){
        errors.push({text: "Por favor ingrese una clave"});
    }
    if(errors.length>=1){
        res.render('partials/register')
    }else{
        const newuser = new user({username, password, type});
        await newuser.save();
        res.redirect('/login');
    }
});


router.post('/login', async (req, res) => {

});

module.exports=router;