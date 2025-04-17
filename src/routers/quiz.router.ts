import { Router } from "express";
import { quizController } from "../controllers/quiz.controller";

export const quizRouter = Router();

quizRouter.route("/").get(quizController.getAll);

quizRouter.route("/id").get(quizController.getById);
