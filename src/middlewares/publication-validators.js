import { body, param } from "express-validator";
import { userFound,categoryFound,postFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const createPublicationValidator = [
    body("title").notEmpty().withMessage("Publications title is required"),
    body("creator").notEmpty().withMessage("Creator Id is required"),
    body("creator").isMongoId().withMessage("The id provided is not a mongo valid id"),
    body("creator").custom(userFound),

    body("category").notEmpty().withMessage("The category  id is required"),
    body("category").isMongoId().withMessage("The id provided is not a mongo valid id"),
    body("category").custom(categoryFound),
    body("content").notEmpty().withMessage("Content is required"),
    validarCampos,
    handleErrors
];

export const editPublicationValidator = [
    validateJWT,
    param("pib").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("pib").custom(postFound),
    body("title").notEmpty().withMessage("Publications title is required"),
    body("category").optional().isMongoId().withMessage("The id provided is not a mongo valid id"),
    body("category").optional().custom(categoryFound),
    body("content").notEmpty().withMessage("Content is required"),
    validarCampos,
    handleErrors
];

export const deletePublicationValidator = [
    validateJWT,
    param("pib").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("pib").custom(postFound),
    validarCampos,
    handleErrors
];