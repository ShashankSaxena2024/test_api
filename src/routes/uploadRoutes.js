const express = require('express');
const uploadRouter = express.Router();
const auth = require('../middlewares/auth');
const { uploadImage } = require('../controllers/uploadController')

const multer = require('multer');
const path = require('path');

uploadRouter.use(express.static('public'));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/'), function (error, success) {
            if (error) {
                console.log(error);
            }
        });
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (error, success) {
            if (error) {
                console.log(error);
            }
        });
    }
});

const upload = multer({storage:storage});

uploadRouter.post('/image', upload.single('image'), uploadImage);

module.exports = uploadRouter;