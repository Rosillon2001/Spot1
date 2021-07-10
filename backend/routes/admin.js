const router = require('express').Router();
const session = require('express-session');

const user = require('../models/users.js');
const song = require('../models/songs.js');

router.get('/admin/pSong',async (req, res) => {
    const userData = await user.findById(req.params.id).lean();
    res.render('partials/songForm', {userData, layout:'userLayout'});
});

router.post('/admin/pSong', async (req, res) => {
    console.log(req.body);
    const {name, author, album, gender, uploader} = req.body;
    console.log(uploader);
    const newSong = new song({name, author, album, gender, uploader});
    await newSong.save();
    res.redirect('/admin/dashboard');
});

router.get('/admin/allSongs' , async (req, res) => {
    const songs = await song.find().lean();
    console.log(songs);
    //
    res.render('partials/allSongs', {songs , layout: 'userLayout'});

});

router.get('/playSong/:nombre', (req, res) => {
    var ext = '.mp3';
    var cancion = req.params.nombre;
    var laCancion = cancion.concat(ext);
    console.log(req.params.nombre);
    res.render('partials/admin', {laCancion, cancion , layout: 'userLayout'})
});



module.exports = router;
