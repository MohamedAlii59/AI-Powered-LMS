import { Router } from "express";
export const studentQuizAttemptRouter = Router();

studentQuizAttemptRouter.route("/").get();

studentQuizAttemptRouter.route("/id").get();
