const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    content:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        }
    ]
},{timestamps:true});

module.exports = mongoose.model('post',postSchema);