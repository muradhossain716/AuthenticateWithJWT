const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv = require("dotenv");
const userHandler=require('./handler/userHandler')
const orderHandler=require('./handler/orderHandler')
const app=express();
dotenv.config()
app.use(express.json());

mongoose
  .connect("mongodb://localhost/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

  app.use('/user',userHandler);
  app.use('/order',orderHandler); 

  app.listen(5000,()=> console.log('db connected succesfully '))