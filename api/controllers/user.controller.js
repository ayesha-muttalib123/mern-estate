const bcrypt =require( 'bcrypt')
const User =require( '../models/user.model');


exports.createUser = async (req, res) => {
    try {
        res.json({ message: 'hello world' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, avatar } = req.body;

        // Ensure the user is updating their own account
        if (id !== req.user.id) { // Assuming req.user.id contains the authenticated user's ID
            return res.status(401).json({ message: "You can only update your own account" });
        }

        // Hash the new password if provided
        let updatedPassword;
        if (password) {
            updatedPassword = bcrypt.hashSync(password, 10);
        }

        // Find the user and update the provided fields
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    username,
                    email,
                    password: updatedPassword,
                    avatar
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
