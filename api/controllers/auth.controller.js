// const User = require("../models/user.model");
// const bcrypt = require('bcrypt');
// const jwt=require('jsonwebtoken')
// require('dotenv').config()

// exports.Signup = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User already exists' });
//         }
//         if(!password){
//             return res.status(400).json({ error: 'password required' });
//         }
//         if(!password>=6){
//             return res.status(400).json({ error: 'min length of pasword should be 6' });
//         }


//         // Hash the password
//         const hashPassword = bcrypt.hashSync(password, 10);

//         // Create a new user
//         const newUser = await User.create({
//             username,
//             email,
//             password: hashPassword
//         });

//         // Save the new user
        

//         res.status(200).json({ message: 'User created successfully' });

//     } catch (err) {
//         console.error(err); // Log the error
//         res.status(500).json({ error: 'Server error', details: err.message });
//     }
// };

// exports.SignIn=async(req,res)=>{
//     const {email,password}=req.body;
//     try {
//      const validUser=await User.findOne({email});
//      if(!validUser){
//         return res.status(400).json({error:'Invalid email or password'});
        
//     } 
//     const validPassword=bcrypt.compareSync(password,validUser.password)
// if(!validPassword){
//    return res.status(400).json({error:'Invalid Credentials'}) 
// }
//     const token=jwt.sign({id:validUser._id},process.env.SECRET_KEY)
//     // password npt showing 
//     const {password:pass,...rest}=validUser._doc;
//     // cookie setting 
//     res.cookie('jwt',token,{httpOnly:true,maxAge:3600000}).status(200).json(rest)

//     // you can do like this
//     // res.cookie('jwt',token,{httpOnly:true})

//     }
//     catch (err) {
        
//     }
// }
const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password should be at least 6 characters' });
        }

        // Hash the password
        const hashPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        });

        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

exports.SignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id:validUser._id }, process.env.SECRET_KEY);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }).status(200).json(rest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};
