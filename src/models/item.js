const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : false,
    },
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    status : {
        type : String,
        default : '0',
    },
    ins_ip : {
        type : String,
    },
}, {timestamps : true})

module.exports = mongoose.model("Item", itemSchema);