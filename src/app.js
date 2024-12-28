const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');
const uploadRouter = require('./routes/uploadRoutes');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors({
    origin : '*'
}));
// app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get('/', (req,res)=>{
    res.send('Node API from shashank');
})
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/upload', uploadRouter);

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log('app is listening');
    })
})
.catch((error)=>{
    console.log(error);
})

