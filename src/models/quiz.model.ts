const mongoose = require('mongoose')

const quizSchema= new mongoose.Schema({
  
  
  },
{
    timestamps:true
 
})

const quiz = mongoose.model('quiz',quizSchema)
module.exports = quiz