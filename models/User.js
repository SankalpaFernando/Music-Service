const mongoose = require('mongoose');

const User = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    songs:Array
});

module.exports = mongoose.model('user',User);