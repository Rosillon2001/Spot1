const router = require('express').Router();

router.get('/login', (req, res)=>{
    res.render('partials/login');
});

router.get('/register', (req, res)=>{
    res.render('partials/register');
});


//retornar la vista al presionar el boton de login o register



module.exports=router;