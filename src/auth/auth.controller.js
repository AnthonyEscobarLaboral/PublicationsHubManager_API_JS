import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";


export const register = async (req, res) => {
    try {
        const userReceived = req.body;

        const encryptedPassword = await hash(userReceived.password);

        userReceived.password = encryptedPassword;

        await User.create(userReceived);

        return res.status(201).json({
            message: "User registered succesfully",
            userReceived
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed,check the information",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email,username, password } = req.body
    try{
        const user = await User.findOne({$or:[{email: email}, {username: username}]})

        if(!user){
            return res.status(400).json({
                message: "Email or username provided not found, try again",
                error:"the user provided doesnt exists"
            })
        }

        const correctPassword = await verify(user.password, password)

        if(!correctPassword){
            return res.status(400).json({
                message: "Incorrect password",
                error: "the password you provided its incorrect,try again"
            })
        }
        const token = await generateJWT(user._id)
        
        return res.status(200).json({
            message: "Login successful",
            user: {
                completeName: user.completeName,
                username: user.username,
                email: user.email,
                type: user.type,
                createdAt: user.createdAt, 
                updatedAt: user.updatedAt,
            },
            token:token
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
};
