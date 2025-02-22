import { Router } from "express";
import { createCategory, editCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, editCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Operations related to categories
 */

/**
 * @swagger
 * /newCategory:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new category with a given name and status.
 *     parameters:
 *       - name: categoryName
 *         in: body
 *         description: The name of the category to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             categoryName:
 *               type: string
 *               example: "Technology"
 *     responses:
 *       201:
 *         description: Category successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New category created successfully"
 *                 category:
 *                   type: object
 *                   properties:
 *                     categoryName:
 *                       type: string
 *                       example: "Technology"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-22T15:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-22T15:00:00Z"
 *       500:
 *         description: Failed to create the category due to server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New category creation failed, check the information please"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/newCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /updateCategory/{cid}:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Edit an existing category
 *     description: Edit the name of an existing category by its ID.
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: The category ID to be updated
 *         required: true
 *         type: string
 *       - name: newCategoryName
 *         in: body
 *         description: The new name for the category
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             newCategoryName:
 *               type: string
 *               example: "Science"
 *     responses:
 *       201:
 *         description: Category successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category changes updated successfully"
 *                 category:
 *                   type: object
 *                   properties:
 *                     categoryName:
 *                       type: string
 *                       example: "Science"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-22T15:30:00Z"
 *       400:
 *         description: Category not found or invalid data provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Category not found or invalid data"
 *       500:
 *         description: Server error while updating the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update category changes"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.patch("/updateCategory/:cid", editCategoryValidator, editCategory);

/**
 * @swagger
 * /deleteCategory/{cid}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete an existing category
 *     description: Delete a category from the system by its ID, setting its status to false.
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: The category ID to be deleted
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Category successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       500:
 *         description: Failed to delete the category due to server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete the category"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;
