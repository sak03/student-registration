const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: [3, "Name length must be greate than 3 characters "]
    },
    email: {
        type: String,
        require: true,
        unique: [true, "Emain id already exist"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email id")
            }
        }
    },
    phone: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 10,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    class: {
        type: String
    },
    rollNo: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Roll number must be greater than 0")
            }
        }
    },
    status: {
        type: String,
        enum: ["pending", "active", "inactive"],
        default: 'pending'
    },
    dateOfBirth: String,
    password: String,
    image: String,
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    }
})

// ==== create new collection ========
const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;