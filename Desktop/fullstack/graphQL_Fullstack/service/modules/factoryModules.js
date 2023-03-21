const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
    {

        firstName: String,
        lastName: String,
        startWorkYear: Number,
        departmentID: String,
        userID: String,
        shiftsID: [String],
    }
);
const departmentSchema = new mongoose.Schema(
    {
        fullName: String,
        numOfActions: Number,
        manager: String,
    }
);
const shiftSchema = new mongoose.Schema(
    {
        Date: String,
        Starting: Number,
        Ending: Number,
        employeesID: [String],
    }
);
const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        token: String,
        numOfActions: Number,
    }
);

const Employee = mongoose.model('employee', employeeSchema);
const Department = mongoose.model('department', departmentSchema);
const Shift = mongoose.model('shift', shiftSchema)
const User = mongoose.model('user', userSchema)
module.exports = { Employee, Department, Shift, User };

// ,{ versionKey: false }