import { Router } from "express";
import { studentController } from "../controllers/student.controller";

export const studentRouter = Router();

studentRouter.route("/").get(studentController.getAll);

studentRouter.route("/id").get(studentController.getById);