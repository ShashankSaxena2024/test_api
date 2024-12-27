const itemModel = require('../models/item');

const createItem = async (req, res, next) => {
    const { title, description } = req.body;
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress;
    var itemStatus = 0;
    const newItem = new itemModel({
        title: title,
        description: description,
        userid: req.userid,
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
const updateItem = async (req, res, next) => {
    const id = req.params.id;
    const {title, description} = req.body;
    const newItem = {
        title : title,
        description : description,
        userid : req.userid
    }
    try {
        await itemModel.findByIdAndUpdate(id, newItem, {new:true});
        res.status(200).json({
            status: '200',
            msg: 'updated',
            result: newItem,
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
const deleteItem = async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await itemModel.findByIdAndRemove(id);
        res.status(202).json({
            status: '202',
            msg: 'deleted',
            result: '',
            token: ''
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '500',
            msg: 'Unable to delete',
            result: '',
            token: ''
        }) 
    }
}
const getItem = async (req, res, next) => {
    try {
        const items = await itemModel.find({userid:req.userid});
        res.status(200).json({
            status: '200',
            msg: 'items list',
            result: items,
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

module.exports = { createItem, updateItem, deleteItem, getItem }
