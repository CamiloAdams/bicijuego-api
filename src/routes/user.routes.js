import { Router } from "express";

import * as userCtrl from "../controllers/user.controller";
import { authjwt } from "../middlewares";

const router = Router();

router.get("/", [authjwt.verifyToken, authjwt.isAdmin], userCtrl.getUsers);

export default router;
