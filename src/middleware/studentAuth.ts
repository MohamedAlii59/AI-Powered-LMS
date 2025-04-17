import jwt from 'jsonwebtoken';
import {  Request, Response,NextFunction } from "express";
import { ObjectId } from "mongodb";
import { database } from "../db/db";
import { studentSchema } from "../models/student.model";
import { from } from "rxjs";

const JWT_SECRET ='AI-LMS'


const studentAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    //Verify the token
    const decoded = jwt.verify(token, JWT_SECRET as string) as { _id: string };
     // Find the student
     
    const Student = await database.student.findOne({ _id: decoded._id, 'tokens.token': token });
    
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }

    if (!Student) {
      throw new Error('student not found');
    }

    req.token = token;
    req.student = student;

    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({ 
      error: 'Please authenticate.',
      details: e.message 
    });
  }
  
};

export default studentAuth;