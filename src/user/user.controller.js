import { hash, verify } from "argon2";
import User from "./user.model.js"

export const updateUserUsername = async (req, res) => {
    try {
        const user = req.userJwt;
        const { newUsername } = req.body;

        if (newUsername === user.username) {
            return res.status(400).json({
                success: false,
                message: "The new username cannot match the old username, try again"
            })
        }

        const userChanged = await User.findByIdAndUpdate(user._id, { username: newUsername }, { new: true })

        res.status(200).json({
            success: true,
            msg: 'Username updated succesfully',
            user: {
                completeName: userChanged.completeName,
                username: userChanged.username,
                email: userChanged.email,
                type: userChanged.type,
                createdAt: userChanged.createdAt, 
                updatedAt: userChanged.updatedAt,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Failed to update changes on username',
            error: err.message
        });
    }
};

export const updateUserPassword = async (req, res) => {
    try {
        const user = req.userJwt;
        const { oldPassword, newPassword } = req.body;

        const oldPasswordsComparison = await verify(user.password, oldPassword);
        if (!oldPasswordsComparison) {
            return res.status(400).json({
                success: false,
                message: "The old password provided does not match the old users password, try again"
            })
        }

        const newPasswordsComparison = await verify(user.password, newPassword);
        if (newPasswordsComparison) {
            return res.status(400).json({
                success: false,
                message: "The new password cannot be the same as the old password, try again"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(user._id, { password: encryptedPassword }, { new: true })

        res.status(200).json({
            success: true,
            msg: 'Password updated succesfully for user: ',
            user: {
                completeName: user.completeName,
                username: user.username,
                email: user.email,
                type: user.type,
                createdAt: user.createdAt, 
                updatedAt: user.updatedAt,
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Failed to update user password',
            error: err.message
        });
    }
};