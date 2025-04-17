import { RequestHandler, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { instructorSchema } from "../models/instructor.model";
import { database } from "../db/db";
import { from } from "rxjs";

const getAll: RequestHandler = async (req: Request, res: Response) => {
    const instructors = await database.instructor.find();
    return res.status(200).json(instructors);
}

const getById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const instructor = await database.instructor.findOne({ _id: new ObjectId(id) });
    if (instructor) {
        return res.status(200).json(instructor);
    }
    return res.status(400).json({ message: "Student Not Found!" });
}

export const instructorController = {
    getAll,
    getById,
};