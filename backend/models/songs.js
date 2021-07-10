const mongoose = require('mongoose');
const{Schema} = mongoose;

const song = new Schema({
    name: {type:String, required:true}, 
    author: {type:String, required:true},
    gender: {type:String, required:true}, 
    album: {type:String, required:true},  
    uploader: {type:String, required:true}
});

module.exports = mongoose.model('songs', song);