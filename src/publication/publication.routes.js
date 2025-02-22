import { Router } from "express";
import { createPublication,editPublication,deletePublication} from "./publication.controller.js";
import { createPublicationValidator,editPublicationValidator,deletePublicationValidator} from "../middlewares/publication-validators.js"

const router = Router()
/**
 * @openapi
 * /newPost:
 *   post:
 *     description: "Crea una nueva publicación."
 *     operationId: createPublication
 *     tags:
 *       - "Publication"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Título de la publicación."
 *               creator:
 *                 type: string
 *                 description: "ID del usuario creador."
 *               category:
 *                 type: string
 *                 description: "ID de la categoría de la publicación."
 *               content:
 *                 type: string
 *                 description: "Contenido de la publicación."
 *             required:
 *               - title
 *               - creator
 *               - category
 *               - content
 *     responses:
 *       201:
 *         description: "Publicación creada exitosamente."
 *       500:
 *         description: "Error al crear la publicación."
 */
router.post("/newPost", createPublicationValidator, createPublication);

/**
 * @openapi
 * /editPublication/{pib}:
 *   put:
 *     description: "Edita una publicación existente."
 *     operationId: editPublication
 *     tags:
 *       - "Publication"
 *     parameters:
 *       - in: path
 *         name: pib
 *         required: true
 *         description: "ID de la publicación a editar."
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Nuevo título de la publicación."
 *               content:
 *                 type: string
 *                 description: "Nuevo contenido de la publicación."
 *     responses:
 *       200:
 *         description: "Publicación editada exitosamente."
 *       400:
 *         description: "No se puede editar una publicación que no te pertenece."
 *       500:
 *         description: "Error al editar la publicación."
 */
router.put("/editPublication/:pib", editPublicationValidator, editPublication);

/**
 * @openapi
 * /deletePublication/{pib}:
 *   delete:
 *     description: "Elimina una publicación."
 *     operationId: deletePublication
 *     tags:
 *       - "Publication"
 *     parameters:
 *       - in: path
 *         name: pib
 *         required: true
 *         description: "ID de la publicación a eliminar."
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Publicación eliminada exitosamente."
 *       400:
 *         description: "No se puede eliminar una publicación que no te pertenece."
 *       500:
 *         description: "Error al eliminar la publicación."
 */
router.delete("/deletePublication/:pib", deletePublicationValidator, deletePublication);

export default router
