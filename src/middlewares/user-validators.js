import { body, param } from "express-validator";
import { emailExists, usernameExists, userFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const registerValidator = [
    body("completeName").notEmpty().withMessage("your complete name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("username").custom(usernameExists),
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("the email you provided is not valid"),
    body("email").custom(emailExists),
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
    body("email").optional().isEmail().withMessage("the email you provided is not valid"),
    body("username").optional().isString().withMessage("Username cannot be diferent but only text"),
    body("password").isLength({min: 8}).withMessage("Password cannot contain less than 8 characters long"),
    validarCampos,
    handleErrors
]


export const updateUserInformation = [
    validateJWT,
    param("uid").isMongoId().withMessage("The Id provided its not mongo id valid"),
    param("uid").custom(userFound),
    body("newUsername").notEmpty().withMessage("New username required"),
    body("newPassword").isLength({min: 8}).withMessage("The new password needs to be at least 8 characters long"),
    body("newPassword").isStrongPassword({
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The new password needs to contains 1 lower and uppercase letter,1 number and 1 symbol at least to be strong, try again"),,
    validarCampos,
    handleErrors
]