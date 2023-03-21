const { gql } = require("apollo-server")
const typeDefs = gql`
type Employee{
    id: String,
    firstName: String,
    lastName: String,
    startWorkYear: Int,
    departmentID: String,
    shiftsID: [String],
    userID: String,
},
input EmployeeInput{
    firstName: String,
    lastName: String,
    startWorkYear: Int,
    departmentID: String,
    shiftsID: [String],
    userID: String,
}
type Department{
    id: String,
    fullName: String,
    numOfActions: Int,
    manager: String,
},
input DepartmentInput{
    fullName: String,
    numOfActions: Int,
    manager: String,
}
type Shift{
    id: String,
    Date: String,
    Starting: Int,
    Ending: Int,
    employeesID: [String],
},
input ShiftInput{
    Date: String,
    Starting: Int,
    Ending: Int,
    employeesID: [String],
}
type User{
    id: String,
    username: String,
    numOfActions: Int,
    email: String,
    token: String,
},
input UserInput{
    numOfActions: Int,
}
input LoginInput{
    username: String,
    email: String,
}
type action{
    id: String,
    maxActions: Int,
    date: String,
    actionAllowd: Int,
}

type Query{
    getAllEmployees: [Employee]
    getEmployee(ID: ID!): Employee
    getAllDepartments: [Department]
    getDepartment(ID: ID!): Department
    getAllShifts: [Shift]
    getShift(ID: ID!): Shift
    getAllUsers: [User]
    getUserByName(username: String): User
    getAllActs: [action]
    getActByUserID(ID: ID!):action
}
type Mutation {
    addEmployee(emp: EmployeeInput): String 
    updateEmployee(ID: ID!, emp: EmployeeInput): String 
    deleteEmployee(ID: ID!): String
    addDepartment(dep: DepartmentInput): String 
    updateDepartment(ID: ID!, dep: DepartmentInput): String 
    deleteDepartment(ID: ID!): String
    addShift(shif: ShiftInput): String 
    updateShift(ID: ID!, shif: ShiftInput): String 
    deleteShift(ID: ID!): String
    updateUser(ID: ID!, u: UserInput): String 
    loginUser(loginInput:LoginInput):User
    getDecAction(ID: ID!):Int
}`

module.exports = { typeDefs }