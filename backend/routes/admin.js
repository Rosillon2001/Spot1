const router = require('express').Router();
var fs = require('fs');
var path = require('path');

const user = require('../models/users.js');
const song = require('../models/songs.js');

router.get('/admin/pSong',async (req, res) => {
    const userData = await user.findById(req.params.id).lean();
    res.render('partials/songForm', {userData, layout:'userLayout'});
});

router.post('/admin/pSong', async (req, res) => {
    console.log(req.body);
    const {name, author, album, gender, route} = req.body;
    const newSong = new song({name, author, album, gender, route});
    await newSong.save();
    res.redirect('/admin/dashboard');
});

router.get('/admin/allSongs' , async (req, res) => {
    const songs = await song.find().lean();
    console.log(songs);
    //
    res.render('partials/admin', {songs , layout: 'userLayout'});

});

router.get('/playSong/:nombre', (req, res) => {
    var route = 'Canciones/';
    var ext = '.mp3';
    var cancion = req.params.nombre;
    var laCancion = route.concat(cancion);
    console.log(req.params.nombre);
    res.render('partials/admin', {laCancion , layout: 'userLayout'})
});


module.exports = router;