import { RequestHandler, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { studentSchema } from "../models/student.model";
import { database } from "../db/db";
import { from } from "rxjs";

const getAll: RequestHandler = async (req: Request, res: Response) => {
    const students = await database.student.find();
    return res.status(200).json(students);
}

const getById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const student = await database.student.findOne({ _id: new ObjectId(id) });
    if (student) {
        return res.status(200).json(student);
    }
    return res.status(400).json({ message: "Student Not Found!" });
}
export const studentController = {
    getAll,
    getById,
};