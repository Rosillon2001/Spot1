const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('partials/index');
});  

router.get('/layouts/main', (req, res)=>{
    res.render('partials/register');
});
module.exports=router;