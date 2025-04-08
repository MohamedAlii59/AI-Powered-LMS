import { Router } from "express";
export const gradesRouter = Router();

gradesRouter.route("/").get();

gradesRouter.route("/id").get();
