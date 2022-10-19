import { Router } from "express";

import * as questionsCtrl from "../controllers/questions.controller";
import { authjwt } from "../middlewares";
import { verifyToken } from "../middlewares/authJwt";

const router = Router();

router.post(
    "/",
    [authjwt.verifyToken, authjwt.isAdmin],
    questionsCtrl.createQuestion
);

router.get("/", [authjwt.verifyToken], questionsCtrl.getQuestions);

router.get(
    "/:questionId",
    [authjwt.verifyToken],
    questionsCtrl.getQuestionById
);

router.put(
    "/:questionId",
    [authjwt.verifyToken, authjwt.isAdmin],
    questionsCtrl.updateQuestionById
);

router.delete(
    "/:questionId",
    [authjwt.verifyToken, authjwt.isAdmin],
    questionsCtrl.deleteQuestionById
);

export default router;
