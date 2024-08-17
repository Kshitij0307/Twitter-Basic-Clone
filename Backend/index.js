const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
dotenv.config();

mongoose.connect(process.env.DBURL).then(()=>console.log("Database connected"));

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true               
  }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);



app.listen(process.env.PORT,()=> {
    console.log("Server started")
});