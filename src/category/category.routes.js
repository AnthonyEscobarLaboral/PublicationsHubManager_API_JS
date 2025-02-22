import { Router } from "express";
import { createCategory,editCategory,deleteCategory} from "./category.controller.js";
import { createCategoryValidator,editCategoryValidator,deleteCategoryValidator} from "../middlewares/category-validators.js"

const router = Router()

router.post("/newCategory", createCategoryValidator, createCategory);

router.patch("/updateCategory/:cid", editCategoryValidator, editCategory);

router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router
