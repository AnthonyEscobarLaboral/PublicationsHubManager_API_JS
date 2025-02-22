import { Router } from "express";
import { addComment, editComment, deleteComment } from "./comment.controller.js";
import { addCommentValidator, editCommentValidator, deleteCommentValidator } from "../middlewares/comment-validators.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Operations related to comments
 */

/**
 * @swagger
 * /addComment/{pib}:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add a new comment to a publication
 *     description: Add a new comment to a publication by its ID.
 *     parameters:
 *       - name: pib
 *         in: path
 *         description: The publication ID where the comment will be added
 *         required: true
 *         type: string
 *       - name: opinion
 *         in: body
 *         description: The content of the comment
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             opinion:
 *               type: string
 *               example: "Great article!"
 *     responses:
 *       201:
 *         description: Comment successfully added to the publication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment created and posted successfully"
 *                 commentCreated:
 *                   type: object
 *                   properties:
 *                     opinion:
 *                       type: string
 *                       example: "Great article!"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-22T16:00:00Z"
 *       500:
 *         description: Failed to create the comment due to server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New comment creation failed, check it again please"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/addComment/:pib", addCommentValidator, addComment);

/**
 * @swagger
 * /editComment/{cmid}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Edit an existing comment
 *     description: Edit the opinion of an existing comment by its ID.
 *     parameters:
 *       - name: cmid
 *         in: path
 *         description: The comment ID to be edited
 *         required: true
 *         type: string
 *       - name: opinion
 *         in: body
 *         description: The new content of the comment
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             opinion:
 *               type: string
 *               example: "Amazing article!"
 *     responses:
 *       201:
 *         description: Comment successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment changes updated successfully"
 *                 changedComment:
 *                   type: object
 *                   properties:
 *                     opinion:
 *                       type: string
 *                       example: "Amazing article!"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-22T16:15:00Z"
 *       400:
 *         description: Comment not found or invalid data provided
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
 *                   example: "Comment not found or invalid data"
 *       500:
 *         description: Failed to update the comment due to server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update comment"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put("/editComment/:cmid", editCommentValidator, editComment);

/**
 * @swagger
 * /deleteComment/{cmid}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete an existing comment
 *     description: Delete a comment by its ID.
 *     parameters:
 *       - name: cmid
 *         in: path
 *         description: The comment ID to be deleted
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Comment successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment deleted successfully"
 *       500:
 *         description: Failed to delete the comment due to server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete the comment"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete("/deleteComment/:cmid", deleteCommentValidator, deleteComment);

export default router;
