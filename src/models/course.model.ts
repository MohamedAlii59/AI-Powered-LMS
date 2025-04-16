const mongoose = require('mongoose')
const { type } = require('os')
const { title } = require('process')
const { Timestamp } = require('mongodb')

const courseSchema= new mongoose.Schema({

      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
      },
      course_code:{
        type:String,
        required:true,
      },
      description:{
        type:String,
        required:true,
      },
      start_date: {
        type:Date,
      },
      end_date: {
        type:Date,
      },
      department:{
        type:String,
      },
      status:{
        type:String, 
      },
      lecturer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'instructor',
      
      },
      students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
      }],
      enrollments_count:{
        type:Number,
        default:0,
      },
    },
{
    timestamps:true
 
})
courseSchema.virtual('contents', {
  ref: 'content',
  localField: '_id',
  foreignField: 'course'
})

// courseSchema.virtual('assignments', {
//   ref: 'assignment',
//   localField: '_id',
//   foreignField: 'courseID'
// })



const course = mongoose.model('course',courseSchema)
module.exports = course