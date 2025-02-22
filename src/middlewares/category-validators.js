import { body, param } from "express-validator";
import { categoryFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const createCategoryValidator = [
    validateJWT,
    body("categoryName").notEmpty().withMessage("The category name is required"),
    validarCampos,
    handleErrors
]

export const editCategoryValidator = [
    validateJWT,
    param("cid").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("cid").custom(categoryFound),
    body("newCategoryName").notEmpty().withMessage("New name is required to a category update"),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    param("cid").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("cid").custom(categoryFound),
    validarCampos,
    handleErrors
]
