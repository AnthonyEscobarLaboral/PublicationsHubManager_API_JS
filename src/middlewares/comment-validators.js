import { body, param } from "express-validator";
import { userFound,postFound,commentFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const addCommentValidator = [
    param("pib").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("pib").custom(postFound),
    body("opinion").notEmpty().withMessage("Comments opinion is required"),
    body("creator").notEmpty().withMessage("Creator Id is required"),
    body("creator").isMongoId().withMessage("The id provided is not a mongo valid id"),
    body("creator").custom(userFound),
    validarCampos,
    handleErrors
];

export const editCommentValidator = [
    validateJWT,
    param("cmid").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("cmid").custom(commentFound),
    body("opinion").notEmpty().withMessage("Comments opinion is required"),
    validarCampos,
    handleErrors
];

export const deleteCommentValidator = [
    validateJWT,
    param("cmid").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("cmid").custom(commentFound),
    body("pib").notEmpty().withMessage("publication Id is required"),
    body("pib").isMongoId().withMessage("The id provided is not a mongo valid id"),
    body("pib").custom(postFound),
    validarCampos,
    handleErrors
];