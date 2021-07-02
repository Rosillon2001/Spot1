const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('partials/index');
});  

module.exports=router;