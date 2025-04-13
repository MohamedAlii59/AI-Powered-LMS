const mongoose = require('mongoose')
const course = require('./course')

const gradesSchema= new mongoose.Schema({
  
  studentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student'
  },
  grade:{
    type:Number,
    required:true
  },
  courseID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'course',
  required:true
    },
  date:{
    type:Date,
    },
  },
{
    timestamps:true
 
})

const grades = mongoose.model('grades',gradesSchema)
module.exports = grades