const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : false,
    },
    // userid : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "User",
    //     required : true,
    // },
    status : {
        type : String,
        default : '0',
    },
    ins_ip : {
        type : String,
    },
}, {timestamps : true})

module.exports = mongoose.model("UploadModel", uploadSchema);