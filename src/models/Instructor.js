const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const course = require('./course')
const { Timestamp } = require('mongodb')
const { type } = require('os')

const instructorSchema = new mongoose.Schema({
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
    department:{
        type: String,
        trim:true,
    },
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

instructorSchema.virtual('courses', {
    ref: 'course',
    localField: '_id',
    foreignField: 'lecturer'
})

instructorSchema.methods.toJSON = function () {
    const instructor = this
    const instructorObject = instructor.toObject()
    delete instructorObject.password
    delete instructorObject.tokens
    delete instructorObject.avatar

    return instructorObject
}
instructorSchema.methods.generateAuthToken = async function () {
    const instructor = this
    const token = jwt.sign({ _id: instructor._id.toString() }, 'thisismynewcourse')
    instructor.tokens = instructor.tokens.concat({ token })
    await instructor.save()
    return token
}
instructorSchema.statics.findByCredentials = async (email, password) => {
    const instructor = await instructor.findOne({ email })
    if ( instructor) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, instructor.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return instructor
}

// Hash the plain text password before saving
instructorSchema.pre('save', async function (next) {
    const instructor = this

    if (instructor.isModified('password')) {
        instructor.password = await bcrypt.hash(instructor.password, 8)
    }
    next()
})

const instructor = mongoose.model('instructor', instructorSchema)

module.exports = instructor