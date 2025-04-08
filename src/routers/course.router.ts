import { Router } from "express";
export const courseRouter = Router();

courseRouter.route("/").get();

courseRouter.route("/id").get();