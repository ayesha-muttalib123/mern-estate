const User = require("../models/user.model");
const bcrypt = require('bcrypt');

exports.Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        if(!password){
            return res.status(400).json({ error: 'password required' });
        }
        if(!password>=6){
            return res.status(400).json({ error: 'min length of pasword should be 6' });
        }


        // Hash the password
        const hashPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        });

        // Save the new user
        

        res.status(200).json({ message: 'User created successfully' });

    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};
