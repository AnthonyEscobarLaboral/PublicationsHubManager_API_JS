import { Router } from "express"
import { updateUserInformation } from "./user.controller.js"
import { updateUserInformationValidator } from "../middlewares/user-validators.js"

const router = Router()

router.put("/updateUserProfile", updateUserInformationValidator, updateUserInformation);

export default router
