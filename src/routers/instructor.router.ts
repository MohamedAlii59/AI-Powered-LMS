import { Router } from "express";
export const instructorRouter = Router();

instructorRouter.route("/").get();

instructorRouter.route("/id").get();