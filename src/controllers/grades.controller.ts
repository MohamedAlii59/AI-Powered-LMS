import { RequestHandler, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { gradesSchema } from "../models/grades.model";
import { database } from "../db/db";
import { from } from "rxjs";

const getAll: RequestHandler = async (req: Request, res: Response) => {
    const gradeses = await database.grades.find();
    return res.status(200).json(gradeses);
}

const getById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const grades = await database.grades.findOne({ _id: new ObjectId(id) });
    if (grades) {
        return res.status(200).json(grades);
    }
    return res.status(400).json({ message: "Student Not Found!" });
}
export const gradesController = {
    getAll,
    getById,
};