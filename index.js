const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = require('./routes/routes.js')
const cors = require('cors');

app.use(express.json());
app.use(cors());

const connectDB = async ()=>{
    await mongoose.connect(Mongo_URL)
    console.log("DB connected")
}
connectDB();

app.use('/', router);

app.listen(3000, ()=>{
    console.log('App is listening to port');  
})