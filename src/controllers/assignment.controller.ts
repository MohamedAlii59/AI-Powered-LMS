import { RequestHandler, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { assignmentSchema } from "../models/assignment.model";
import { database } from "../db/db";
import { from } from "rxjs";

const getAll: RequestHandler = async (req: Request, res: Response) => {
    const assignments = await database.assignment.find();
    return res.status(200).json(assignments);
}

const getById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const assignment = await database.assignment.findOne({ _id: new ObjectId(id) });
    if (assignment) {
        return res.status(200).json(assignment);
    }
    return res.status(400).json({ message: "Student Not Found!" });
}

export const assignmentController = {
    getAll,
    getById,
};
