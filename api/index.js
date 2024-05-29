const express=require('express')
const app=express();
const port=3000;
const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to database')
}).catch((err)=>{
    console.log(err)
})





app.listen(port,()=>{
console.log( " port is listening at "+port)
})

// actually i have created my githu repository in client folder i want tomaove it in root folder:  mv .git ../