const express=require('express')
const app=express();
const port=3000;
const mongoose=require('mongoose');
const  userRoute = require('./routes/user.routes');
const signup = require('./routes/auth.route');
const cors = require('cors');
const cookieParser=require('cookie-parser');
const listing = require('./routes/listingRoute');
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to database')
}).catch((err)=>{
    console.log(err)
})
app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use('/api/user',userRoute)
app.use('/api/auth',signup)
app.use('/api/listing',listing)




app.listen(port,()=>{
console.log( " port is listening at "+port)
})

// actually i have created my githu repository in client folder i want tomaove it in root folder:  mv .git ../