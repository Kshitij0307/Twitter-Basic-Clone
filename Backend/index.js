const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/userModel');
const postModel = require('./models/postModel');
dotenv.config();

mongoose.connect(process.env.DBURL).then(console.log("Database connected"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=> {
    res.send("hello");
});

app.listen(process.env.PORT,()=> {
    console.log("Server started")
});