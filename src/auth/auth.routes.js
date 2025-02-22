import { Router } from "express"
import { register, login} from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/user-validators.js"

const router = Router()

/**
 * @openapi
 * /register:
 *   post:
 *     description: "Registra un nuevo usuario en el sistema con la información proporcionada."
 *     operationId: registerUser
 *     tags:
 *       - "Auth"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               completeName:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *               - completeName
 *     responses:
 *       201:
 *         description: "Usuario registrado exitosamente."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userReceived:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     completeName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     username:
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
 *       500:
 *         description: "Error al registrar al usuario. Verifique la información."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 * 
 * /login:
 *   post:
 *     description: "Inicia sesión con un usuario existente proporcionando las credenciales correctas."
 *     operationId: loginUser
 *     tags:
 *       - "Auth"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: "Inicio de sesión exitoso, se retorna un token y los datos del usuario."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *                 token:
 *                   type: string
 *       400:
 *         description: "El email o username no existe o la contraseña es incorrecta."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: "Error en el servidor durante el inicio de sesión."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.post("/register",registerValidator,register)

router.post("/login",loginValidator,login)

export default router
