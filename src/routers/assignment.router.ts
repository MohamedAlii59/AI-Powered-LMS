import { Router } from "express";
export const assignmentRouter = Router();

assignmentRouter.route("/").get();

assignmentRouter.route("/id").get();
