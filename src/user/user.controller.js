import { hash,verify} from "argon2";
import User from "./user.model.js"

export const updateUserInformation = async (req, res) => {
    try {
        const {user} = req;
        const uid = user._id;
        const  { newUsername,oldPassword,newPassword }  = req.body;

        const oldPasswordsComparison = await verify(user.password, oldPassword);
        const newPasswordsComparison = await verify(user.password, newPassword);

        if(newUsername !== user.username){
            return res.status(400).json({
                success: false,
                message: "The new username cannot match the old username, try again"
            })
        }

        if(!oldPasswordsComparison){
            return res.status(400).json({
                success: false,
                message: "The old password provided does not match the old users password, try again"
            })
        }

        if(newPasswordsComparison){
            return res.status(400).json({
                success: false,
                message: "The new password cannot be the same as the old password, try again"
            })
        }
        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(uid,{username: newUsername}, {password: encryptedPassword}, {new: true})

        res.status(200).json({
            success: true,
            msg: 'Profile information updated succesfully',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Failed to update profile information',
            error: err.message
        });
    }
};