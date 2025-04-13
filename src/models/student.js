const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const course = require('./course')
const { Timestamp } = require('mongodb')
const { type } = require('os')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"Please enter your name"],
        trim: true
    },
    gender:{
        type: String,
        enum:["male","female"]
    },
    email: {
        type: String,
        unique: true,
        required: [true,"Please enter a valid email"],
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age:{
        type: Number,
        required:[true,"Please enter your age"],
        min: 18,
        max: 100
    },
    address:{
        type: String,
        trim: true
    },
    phone_number:{
        type: Number,
    },
    password: {
        type: String,
        required:  [true,"Please enter your password"],
        minlength:[6,"password must be at least 6 characters"],
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    major:{
        type: String,
        trim:true,
    },
    gpa:{
        type: Number,
        min: 0,
        max: 4.0,
        default: 0.0,
        trim:true
    },
    level:{
        type: String,
        enum: ['Freshman','Sophomore','Junior','Senior-I','Senior-II'],
        default: 'Freshman'
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }

    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps:true
})

// studentSchema.virtual('courses', {
//     ref: 'course',
//     localField: '_id',
//     foreignField: 'students'
// })

studentSchema.virtual('assignments', {
    ref: 'assignment',
    localField: '_id',
    foreignField: 'studentID',
    foreignField: 'courseID'
  })
studentSchema.virtual('studentgrades',{
    ref: 'grades',
    localField: '_id',
    foreignField: 'courseID',
    foreignField: 'studentID'
})

studentSchema.methods.toJSON = function () {
    const student = this
    const studentObject = student.toObject()
    delete studentObject.password
    delete studentObject.tokens
    delete studentObject.avatar

    return studentObject
}
studentSchema.methods.generateAuthToken = async function () {
    const student = this
    const token = jwt.sign({ _id: student._id.toString() }, 'thisismynewcourse')
    student.tokens = student.tokens.concat({ token })
    await student.save()
    return token
}
studentSchema.statics.findByCredentials = async (email, password) => {
    const student = await student.findOne({ email })
    if ( student) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, student.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return student
}

// Hash the plain text password before saving
studentSchema.pre('save', async function (next) {
    const student = this

    if (student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 8)
    }
    next()
})

const student = mongoose.model('student', studentSchema)

module.exports = student