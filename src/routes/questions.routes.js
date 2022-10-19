import { Router } from "express";

import * as questionsCtrl from "../controllers/questions.controller";

const router = Router();

router.post("/", questionsCtrl.createQuestion);
router.get("/", questionsCtrl.getQuestions);
router.get("/:questionId", questionsCtrl.getQuestionById);
router.put("/:questionId", questionsCtrl.updateQuestionById);
router.delete("/:questionId", questionsCtrl.deleteQuestionById);

export default router;
