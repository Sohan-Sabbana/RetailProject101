const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./route/vendorroute');
const bodyParser = require('body-parser');
const firmRoutes = require('./route/firmroutes');
const productRoutes = require('./route/productroutes');
const queueRoutes = require('./route/qroute');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
dotenv.config();

mongoose.connect(process.env.URI)
 .then(()=>console.log("connected mongo"))
 .catch((err)=>console.log(err));

 app.use(bodyParser.json());

 app.use('/vendor',vendorRoutes);
 app.use('/firm',firmRoutes);
 app.use('/product',productRoutes);
 app.use('/queue',queueRoutes);
 app.use('/uploads',express.static('uploads'));

 app.listen(PORT,()=>{
    console.log(`server connected to ${PORT}`);
 })

 app.use('/',(req,res)=>{
    res.send('hello sih')
 })