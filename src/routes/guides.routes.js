import { Router } from "express";

import * as guideCtrl from "../controllers/guide.controller";
import { authjwt } from "../middlewares";

const router = Router();

router.post("/", [authjwt.verifyToken, authjwt.isAdmin], guideCtrl.createGuide);

router.get("/", [authjwt.verifyToken], guideCtrl.getGuides);

router.get("/:guideId", [authjwt.verifyToken], guideCtrl.getGuideById);

router.put(
    "/:guideId",
    [authjwt.verifyToken, authjwt.isAdmin],
    guideCtrl.updateGuideById
);

router.delete(
    "/:guideId",
    [authjwt.verifyToken, authjwt.isAdmin],
    guideCtrl.deleteGuideById
);

export default router;
