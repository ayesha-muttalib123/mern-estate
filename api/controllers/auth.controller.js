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

        // Hash the password
        const hashPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        // Save the new user
        await newUser.save();

        res.status(200).json({ message: 'User created successfully' });

    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};
