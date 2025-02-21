"use strict"
import { hash } from "argon2";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import User from "../src/user/user.model.js";
import Category from "../src/category/category.model.js";
import { dbConnection } from "./dbMongoConnection.js";

const configs = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}


const connectionDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}


export const defaultAdminAccount = async () => {
    try {
        const admin = await User.findOne({ type: "ADMIN" });
        if (admin) {
            return console.log(`An admin account already exists:${admin}`);
        }
        const defaultAdmin = {
            completeName: "Braulio Jose Echeverria Montufar",
            email: "becheverria@gmail.com",
            username: "becheverria",
            type: "ADMIN",
        }
        const encryptedPassword = await hash("AdminPass@123");
        defaultAdmin.password = encryptedPassword;
        await User.create(defaultAdmin);

        return console.log(`Admin default account created succesfully:${defaultAdmin.toJson()}`);

    } catch (err) {
        return console.error(`Error creating default admin account:${err}`);
    }
};

export const defaultCategory = async () => {
    try {
        const categoryFound = await Category.findOne({ categoryName: "General" });
        if (categoryFound) {
            return console.log(`An default category already exists:${categoryFound}`);
        }
        const defaultCategory = {
            categoryName: "General"
        }
        await Category.create(defaultCategory);

        return console.log(`Default category created succesfully:${defaultCategory.toJson()}`);

    } catch (err) {
        return console.error(`Error creating a default category:${err}`);
    }
};

export const initServer = () => {
    const app = express()
    try {
        configs(app)
        connectionDB()
        defaultAdminAccount()
        defaultCategory()
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}

