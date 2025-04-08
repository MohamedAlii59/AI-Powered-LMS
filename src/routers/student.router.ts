import { Router } from "express";

export const studentRouter = Router();

studentRouter.route("/").get();

studentRouter.route("/id").get();