import { Router } from "express";
import { courseController } from "../controllers/course.controller";

export const courseRouter = Router();

courseRouter.route("/").get(courseController.getAll);

courseRouter.route("/id").get(courseController.getById);