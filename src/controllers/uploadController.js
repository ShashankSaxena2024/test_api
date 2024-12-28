const uploadModel = require('../models/uploadModel');


const uploadImage = async (req,res)=>{
const { title } = req.body;
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress;
    var itemStatus = 0;
    const newItem = new uploadModel({
        title: title,
        image: req.file.filename,
        status: itemStatus,
        ins_ip: ip
    })

    try {
        await newItem.save();
        res.status(201).json({
            status: '201',
            msg: 'Item created successfully',
            result: '',
            token: ''
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '500',
            msg: 'Something went wrong',
            result: '',
            token: ''
        })
    }
}

module.exports = {
    uploadImage
}