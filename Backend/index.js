const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const postModel = require('./models/postModel');
dotenv.config();

mongoose.connect(process.env.DBURL).then(()=>console.log("Database connected"));

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/users',userRoute);



app.listen(process.env.PORT,()=> {
    console.log("Server started")
});