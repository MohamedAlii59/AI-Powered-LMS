const mongoose = require('mongoose')
const instructor = require('./Instructor')
const course = require('./course')

const contentSchema= new mongoose.Schema({

  title:{
        type:String,
  },
  url:{
        type:URL,
  },
  description:{
        type:String,
  },
  uplaoded_at:{
        type:Date,
  },
  realase_date:{
        type:Date,
      },

  instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'instructor',
  },
  course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'course',
  },
},
{
    timestamps:true
 
})

const content = mongoose.model('content',contentSchema)
module.exports = content