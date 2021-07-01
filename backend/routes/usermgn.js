const router = require('express').Router();

router.get('/login', (req, res)=>{
    res.render('partials/login');
});

router.get('/register', (req, res)=>{
    res.render('partials/register');
});

router.post('/register', (req, res)=>{
    console.log(req.body);
    const {username, password}=req.body;
    console.log(username);
    console.log(password);

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
    res.send('ok');
    }
});




module.exports=router;