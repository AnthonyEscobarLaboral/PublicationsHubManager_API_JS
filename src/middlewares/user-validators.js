import { body, param } from "express-validator";
import { emailExists, usernameExists, userFound,usernameFound,emailFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const registerValidator = [
    body("completeName").notEmpty().withMessage("your complete name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("username").isString().withMessage("Username cannot be diferent but only text"),
    body("username").custom(usernameExists),
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("the email you provided is not valid"),
    body("email").custom(emailExists),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    handleErrors
]

export const loginValidator = [
    body("email").optional().custom(emailFound),
    body("email").optional().isEmail().withMessage("the email you provided is not valid"),
    body("username").optional().custom(usernameFound),
    body("username").optional().isString().withMessage("Username cannot be diferent but only text"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isLength({min: 8}).withMessage("Password cannot contain less than 8 characters long"),
    validarCampos,
    handleErrors
]


export const updateUserUsernameValidator = [
    validateJWT,
    body("newUsername").notEmpty().withMessage("New username required"),
    body("newUsername").isString().withMessage("The new username cannot be diferent but only a text"),
    validarCampos,
    handleErrors
]

export const updateUserPasswordValidator = [
    validateJWT,
    body("newPassword").isLength({min: 8}).withMessage("The new password needs to be at least 8 characters long"),
    body("newPassword").isStrongPassword({
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The new password needs to be strong with 1 lowercase,uppercase,number and 1 symbol at least , try again"),
    validarCampos,
    handleErrors
]