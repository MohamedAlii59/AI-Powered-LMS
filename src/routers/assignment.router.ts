import { Router } from "express";
import { assignmentController } from "../controllers/assignment.controller";

export const assignmentRouter = Router();
assignmentRouter.route("/").get(assignmentController.getAll);

assignmentRouter.route("/id").get(assignmentController.getById);
