import { Router } from "express";
import { updateUserUsername,updateUserPassword } from "./user.controller.js";
import { updateUserUsernameValidator,updateUserPasswordValidator } from "../middlewares/user-validators.js"

const router = Router()

router.patch("/updateUserUsername", updateUserUsernameValidator, updateUserUsername)

router.patch("/updateUserPassword", updateUserPasswordValidator, updateUserPassword)

export default router
