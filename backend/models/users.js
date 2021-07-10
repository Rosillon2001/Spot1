const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const{ Schema} = mongoose;

const user = new Schema({
    username: {type:String, required:true}, 
    password: {type:String, required:true},
    type: {type:String, required:true},
    songs: {type:Array}
});

user.methods.encryptPass = async (password) => {
   const salt = await bcrypt.genSalt(10);
   const hashpass = bcrypt.hash(password, salt);
   return hashpass;
};

user.methods.matchPass = async function (password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('users', user);