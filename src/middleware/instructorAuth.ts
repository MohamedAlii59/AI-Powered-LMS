import jwt from 'jsonwebtoken';
import {  Request, Response,NextFunction } from "express";
import { ObjectId } from "mongodb";
import { database } from "../db/db";
import { instructorSchema } from "../models/instructor.model";
import { from } from "rxjs";

const JWT_SECRET ='AI-LMS'


const instructorAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header missing');
    }
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET as string) as { _id: string };
    
    const instructor = await database.instructor.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }
    if (!instructor) {
      throw new Error('Instructor not found');
    }

    req.token = token;
    req.instructor = instructor;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({ 
      error: 'Please authenticate.',
      details: e.message 
    });
  }
  
};

export default instructorAuth;
