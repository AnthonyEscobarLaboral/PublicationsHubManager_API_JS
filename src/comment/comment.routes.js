import { Router } from "express";
import { addComment,editComment,deleteComment} from "./comment.controller.js";
import { addCommentValidator,editCommentValidator,deleteCommentValidator} from "../middlewares/comment-validators.js"

const router = Router()

router.post("/addComment/:pib", addCommentValidator, addComment);
router.put("/editComment/:cmid", editCommentValidator, editComment);
router.delete("/deleteComment/:cmid", deleteCommentValidator, deleteComment);

export default router
