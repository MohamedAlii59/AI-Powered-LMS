import { Router } from "express";
export const quizRouter = Router();

quizRouter.route("/").get();

quizRouter.route("/id").get();
