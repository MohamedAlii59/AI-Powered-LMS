import { RequestHandler, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { quizSchema } from "../models/quiz.model";
import { database } from "../db/db";
import { from } from "rxjs";

const getAll: RequestHandler = async (req: Request, res: Response) => {
    const quizs = await database.quiz.find();
    return res.status(200).json(quizs);
}

const getById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const quiz = await database.quiz.findOne({ _id: new ObjectId(id) });
    if (quiz) {
        return res.status(200).json(quiz);
    }
    return res.status(400).json({ message: "Student Not Found!" });
}
export const quizController = {
    getAll,
    getById,
};