import { Router } from "express";
import { instructorController } from "../controllers/instructor.controller";

export const instructorRouter = Router();

instructorRouter.route("/").get(instructorController.getAll);

instructorRouter.route("/id").get(instructorController.getById);