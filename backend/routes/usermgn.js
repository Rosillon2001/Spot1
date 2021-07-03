const router = require('express').Router();

const user = require('../models/users.js')

router.get('/login', (req, res)=>{
    res.render('partials/login')
});

router.get('/register', (req, res)=>{
    res.render('partials/register');
});



router.post('/register', async(req, res)=>{
    console.log(req.body);
    const {username, password, passwordConf, type} = req.body;
    //console.log(username);
    //console.log(password);

    //consultas
    const usersDB = await user.find('username: `{$username}`' );
    console.log(userDB);

    //manejo de errores y exito
    const errors=[];
    const success=[];

    if(!username){
        errors.push({text: "Por favor ingrese un usuario"});
    }
    if(!password){
        errors.push({text: "Por favor ingrese una clave"});
    }
    if(password!=passwordConf){
        errors.push({text: "Las contraseñas no coinciden"});
    }
    if(errors.length>=1){
        res.render('partials/register',{
            errors
        });
    }
    else{
        success.push({text: "Registro exitoso"});
        const newuser = new user({username, password, type});
        await newuser.save();
        res.redirect('/login');
    }
});


router.post('/login', async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body;

    //validacion del usuario para el login
    const usersDB = await user.find({username: `${username}`});
    console.log(usersDB); 
    let userFlag=0;

    for(let i=0;i<usersDB.length;i++){
        let userInDB = usersDB[i].username;
        console.log(userInDB)
        if(username==userInDB){
            console.log('El usuario existe, iniciando');
            userFlag=1;
        }else{
            userFlag=0;
        }
    }
    if(userFlag==0){
        console.log('El usuario no existe');
    }else{
        res.render('partials/admin');
    }
    
});

module.exports=router;