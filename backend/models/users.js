const mongoose = require('mongoose');
const{ Schema} = mongoose;

const user = new Schema({
    username: {type:String, required:true}, 
    password: {type:String, required:true},
    type: {type:String, required:true}
});

module.exports = mongoose.model('users', user);