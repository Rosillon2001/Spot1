
const router = require('express').Router();

const user = require('../models/users')

router.get('/login', (req, res)=>{
    res.render('partials/login')
});

router.get('/register', (req, res)=>{
    res.render('partials/register');
});

router.get('/user/dash', (req, res) => {
    res.render('partials/normal');
})

router.get('/admin/dash', (req, res) => {
    res.render('partials/admin');
})

router.post('/register', async(req, res)=>{
    console.log(req.body);
    const {username, password, passwordConf, type} = req.body;
    //console.log(username);
    //console.log(password);

    //consultas
    const usersDB = await user.find({username: `${username}`} );
    console.log(usersDB);
    var index = 0;
    for(let i=0;i<usersDB.length;i++){
        var userInDB = usersDB[i].username;
        if(username == userInDB){
            index = i;
        }else{
            index = 0;
        }
    }

    //manejo de errores y exito
    const errors = [];
    const success = [];

    if(index != 0){
        errors.push({text: "El usuario ya existe, por favor ingrese otro"});
    }
    if(!username){
        errors.push({text: "Por favor ingrese un usuario"});
    }
    if(!password){
        errors.push({text: "Por favor ingrese una clave"});
    }
    if(password!=passwordConf){
        errors.push({text: "Las contraseñas no coinciden"});
    }
    if(errors.length >= 1){
        res.render('partials/register',{
            errors
        });
    }
    else{
        success.push({text: "Registro exitoso"});
        const newuser = new user({username, password, type});
        newuser.password = await newuser.encryptPass(password);
        await newuser.save();
        res.redirect('/login');
    }


});



var Userid;

router.post('/login', async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body;
    //se crea la instancia del usuario 
    //validacion del usuario para el login
    const usersDB = await user.findOne({username: `${username}`});
    const verif = await usersDB.matchPass(password);
    console.log(verif);
    console.log(usersDB); 
    let userFlag = 0;
    let passFlag = 0;
    var errors = [];

        let userIdBd = usersDB._id;
        let userInDB = usersDB.username;
        let passInDB = usersDB.password;
        var typeInDB = usersDB.type;
        
        if(username == userInDB){
            console.log('El usuario existe, iniciando');
            nombreusuario = username;
            Userid = userIdBd;
            console.log(userInDB);
            userFlag = 1;
        }else{
            userFlag = 0;
        }
        if(verif){
            console.log("password correcta");
            console.log(passInDB, " == ", password);
            passFlag = 1;
        }else{
            passFlag = 0;
        }
    
    if(userFlag == 0){
        console.log('El usuario no existe');
        errors.push({text : 'El usuario no existe'});
    }
    if(passFlag == 0){
        console.log('password incorrecto');
        errors.push({text: 'Contrseña incorrecta'});
    }
    if(errors.length >= 1){
        res.render('partials/login',{
            errors
        });
    }else{
        if(typeInDB=="admin"){//vista de admin
            res.redirect('/admin/dashboard');
            req.flash('success', 'Iniciando Sesion-Admin');
            
        }else{//vista de usuario normal
            res.redirect('/normal/dashboard');
            req.flash('success', 'Iniciando Sesion-Usuario');
        }
        
    }
    
});

router.get('/admin/dashboard', async (req, res) => {
    const userData = await user.findById(`${Userid}`).lean();
    console.log('username' , userData.username);
    console.log('id', userData._id);
    console.log('type', userData.type);
    console.log('pass', userData.password);

    res.render('partials/admin', { userData, layout : "userLayout"});
});

router.get('/normal/dashboard', async (req, res) => {
    const userData = await user.findById(`${Userid}`).lean();
    console.log('username' , userData.username);
    console.log('id', userData._id);
    console.log('type', userData.type);
    console.log('pass', userData.password);

    res.render('partials/normal', { userData, layout : "userLayout"});
});

// router.get('/user/mngmnt',async (req, res) =>{
//     const userData = await user.findById(`${Userid}`).lean();
//     console.log('username' , userData.username);
//     console.log('pass', userData.password);

//     res.render('partials/userMng', { userData, layout : "UserLayout"});
// });

//mostrar los datos actuales en el form
router.get('/user/mngmnt/:id', async (req, res) =>{
    const userData = await user.findById(req.params.id).lean();
    console.log(userData.username);
    res.render('partials/userMng',{userData, layout : "userLayout"});
});

//actualizar los datos del perfil
router.post('/user/update/:id', async (req, res) =>{
    const userData = await user.findById(req.params.id);
    var type=userData.type;
    var {username, password} = req.body;
    password = await userData.encryptPass(password);
    await user.findByIdAndUpdate(req.params.id, {username, password});
    if(type == 'admin'){
        res.redirect('/admin/dashboard');
    }else{
        res.redirect('/normal/dashboard');
    }

});

//pasar los datos del usuario 
router.get('/user/data',async (req, res) =>{
    const userData = await user.findById(`${Userid}`).lean();
    console.log('username' , userData.username);
    console.log('pass', userData.password);

    res.send({userData});
});


module.exports=router;