import { Router } from "express";
import { gradesController } from "../controllers/grades.controller";

export const gradesRouter = Router();

gradesRouter.route("/").get(gradesController.getAll);

gradesRouter.route("/id").get(gradesController.getById);
