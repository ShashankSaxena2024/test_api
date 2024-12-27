const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    status : {
        type : String,
        default : '0',
    },
    ins_ip : {
        type : String,
    },
    
}, {timestamps : true} );

module.exports = mongoose.model("User", userSchema);

// foreignKey : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "ModelName",
    // }