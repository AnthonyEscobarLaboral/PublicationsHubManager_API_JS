import { Router } from "express";
import { createPublication,editPublication,deletePublication} from "./publication.controller.js";
import { createPublicationValidator,editPublicationValidator,deletePublicationValidator} from "../middlewares/publication-validators.js"

const router = Router()

router.post("/newPost", createPublicationValidator, createPublication);
router.put("/editPublication/:pib", editPublicationValidator, editPublication);
router.delete("/deletePublication/:pib", deletePublicationValidator, deletePublication);

export default router
