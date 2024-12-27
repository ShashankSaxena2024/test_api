const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res, next) => {
    //Existing user
    //Hash Password
    //User Creation
    //Token Generate
    const { username, password, email } = req.body;
    //console.log(req.body);
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                status: '400',
                msg: 'user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress;
        var userStatus = 0;

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username,
            status: userStatus,
            ins_ip: ip
        })

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({
            status: '201',
            msg: 'User created successfully',
            result: result,
            token: token
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

const signin = async (req, res, next) => {
    
    const { email, password } = req.body;
   /// console.log(password);
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({
                status: '404',
                msg: 'user not found'
            })
        }

        // const matchpassword = await bcrypt.compare(password, existingUser.password);
        // if (!matchpassword) {
        //     return res.status(400).json({
        //         status : '400',
        //         msg : 'invalids password'
        //     })
        // }

        await bcrypt.compare(password, existingUser.password, function (err, resp) {
            if (err) {
                // handle error
                console.log(err);
            }
            if (resp) {
                // Send JWT
                const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
                res.status(201).json({
                    status: '201',
                    msg: 'Signin successfully',
                    result: existingUser,
                    token: token
                })
            } else {
                // return response.json({ success: false, message: 'passwords do not match' });
                return res.status(400).json({
                    status: '400',
                    msg: existingUser.password
                })
            }
        });


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

module.exports = { signup, signin };