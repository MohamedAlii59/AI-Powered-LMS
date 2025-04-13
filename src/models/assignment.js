const mongoose = require('mongoose')
const student = require('./student')
const course = require('./course')

const assignmentSchema= new mongoose.Schema({
  studentID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"student",
    required:true
  },
  courseID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course",
    required:true
  },
  name:{
    type:String
  },
  description:{
    type:String
  },
  submission_Date:{
    type:Date
  },
  status:{
    type:String
  },
  file_url:{
    type:URL
  },
  grade:{
    type:Number
  },
  instructor_feedback:{
    type:String
  },
  graded_date:{
    type:Date
  },
  },
{
    timestamps:true
 
})

const assignment = mongoose.model('assignment',assignmentSchema)
module.exports = assignment