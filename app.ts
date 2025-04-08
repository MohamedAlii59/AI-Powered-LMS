import express, { json, NextFunction, Request, Response } from "express";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import { courseRouter } from "./src/routers/course.router";
import { instructorRouter } from "./src/routers/instructor.router";
import { studentRouter } from "./src/routers/student.router";
import { quizRouter } from "./src/routers/quiz.router";
import { assignmentRouter } from "./src/routers/assignment.router";
import { gradesRouter } from "./src/routers/grades.router";
import { studentQuizAttemptRouter } from "./src/routers/studentQuizAttempt.router";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(json());

app.use("/api/course", courseRouter);
app.use("/api/student", instructorRouter);
app.use("/api/instructor", studentRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/grades", gradesRouter);
app.use("/api/studentQuizAttempt", studentQuizAttemptRouter)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ message: error.message });
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
