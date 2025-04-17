import { RequestHandler, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { courseSchema } from "../models/course.model";
import { database } from "../db/db";
import { from } from "rxjs";

const getAll: RequestHandler = async (req: Request, res: Response) => {
    const courses = await database.course.find();
    return res.status(200).json(courses);
}

const getById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const course = await database.course.findOne({ _id: new ObjectId(id) });
    if (course) {
        return res.status(200).json(course);
    }
    return res.status(400).json({ message: "Student Not Found!" });
}

export const courseController = {
    getAll,
    getById,
};