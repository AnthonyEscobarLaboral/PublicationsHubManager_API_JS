import { Router } from "express";
import { updateUserUsername,updateUserPassword } from "./user.controller.js";
import { updateUserUsernameValidator,updateUserPasswordValidator } from "../middlewares/user-validators.js"

const router = Router()

/**
 * @openapi
 * /updateUserUsername:
 *   patch:
 *     description: "Actualiza el nombre de usuario del usuario autenticado."
 *     operationId: updateUsername
 *     tags:
 *       - "User"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newUsername:
 *                 type: string
 *                 description: "Nuevo nombre de usuario para el usuario autenticado."
 *             required:
 *               - newUsername
 *     responses:
 *       200:
 *         description: "Nombre de usuario actualizado correctamente."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Username updated succesfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     completeName:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [USER, ADMIN]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: "El nuevo nombre de usuario no puede ser el mismo que el actual."
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
 *                   example: "The new username cannot match the old username, try again"
 *       500:
 *         description: "Error en el servidor al intentar actualizar el nombre de usuario."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Failed to update changes on username"
 *                 error:
 *                   type: string
 *                   example: "Error message here"
 *
 * /updateUserPassword:
 *   patch:
 *     description: "Actualiza la contraseña del usuario autenticado."
 *     operationId: updatePassword
 *     tags:
 *       - "User"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: "Contraseña actual del usuario."
 *               newPassword:
 *                 type: string
 *                 description: "Nueva contraseña del usuario."
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: "Contraseña actualizada correctamente."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Password updated succesfully for user: "
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     completeName:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [USER, ADMIN]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: "La contraseña antigua no coincide o la nueva contraseña es igual a la antigua."
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
 *                   example: "The old password provided does not match the old users password, try again"
 *       500:
 *         description: "Error en el servidor al intentar actualizar la contraseña."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: "Failed to update user password"
 *                 error:
 *                   type: string
 *                   example: "Error message here"
 */

router.patch("/updateUserUsername", updateUserUsernameValidator, updateUserUsername)

router.patch("/updateUserPassword", updateUserPasswordValidator, updateUserPassword)

export default router
