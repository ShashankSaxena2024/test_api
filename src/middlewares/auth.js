const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userid = user.id;
        } else {
            res.status(401).json({
                status: '401',
                msg: 'Unauthorized user',
                result: '',
                token: ''
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '500',
            msg: 'Something went wrong1',
            result: '',
            token: ''
        })
    }
}

module.exports = auth;