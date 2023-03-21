import { gql } from '@apollo/client'
//employee
const UPDATE_EMPLOYEE = gql`
    mutation updateEmployee( $id: ID!, $emp: EmployeeInput) {
  updateEmployee( ID: $id, emp: $emp)
}`

const DELETE_EMPLOYEE = gql`
mutation Mutation($id: ID!) {
  deleteEmployee(ID: $id)
}`
const ADD_EMPLOYEE = gql`
mutation AddEmployee($emp: EmployeeInput, $id: ID!, $u: UserInput) {
  addEmployee(emp: $emp)
  updateUser(ID: $id, u: $u)
}`

const ADD_SHIFT_TO_EMP = gql`mutation updateEmpShift($id: ID!, $emp: EmployeeInput, $updateShiftId2: ID!, $shif: ShiftInput) {
  updateEmployee(ID: $id, emp: $emp)
  updateShift(ID: $updateShiftId2, shif: $shif)
}
`
// department
const ADD_DEPARTMENT = gql`
mutation AddNewDepartment($dep: DepartmentInput) {
  addDepartment(dep: $dep)
}
`
const UPDATE_DEPARTMENT = gql`
mutation UpdateDepartment($id: ID!, $dep: DepartmentInput) {
  updateDepartment(ID: $id, dep: $dep)
}
`
const UPDATE_EMP_DEP = gql`
mutation updateEmpDep($id: ID!, $emp: EmployeeInput) {
  updateEmployee(ID: $id, emp: $emp)
}`
const DELETE_DEPARTMENT = gql`
mutation DeleteDepartment($id: ID!) {
  deleteDepartment(ID: $id)
}`

// shift
const ADD_SHIFT = gql`
mutation AddNewShift($shif: ShiftInput) {
  addShift(shif: $shif)
}
`
const UPDATE_SHIFT = gql`
mutation updateThisShift($id: ID!, $shif: ShiftInput) {
  updateShift(ID: $id, shif: $shif)
}
`

const UPDATE_SHIFT_EMP = gql`
mutation UpdateShiftToEmp($id: ID!, $shif: ShiftInput, $updateEmployeeId2: ID!, $emp: EmployeeInput) {
  updateShift(ID: $id, shif: $shif)
  updateEmployee(ID: $updateEmployeeId2, emp: $emp)
}`

// usesr / user login
const LOGIN_USER = gql`
mutation login($loginInput: LoginInput){
    loginUser(loginInput:$loginInput){
        email
        username
        token
        id
    }
}
`
const UPDATE_USER_ACT = gql`mutation Mutation($id: ID!, $u: UserInput) {
  updateUser(ID: $id, u: $u)
}`
const DEC_ACT = gql`mutation DecAct($id: ID!) {
  getDecAction(ID: $id)
}`


export { UPDATE_EMPLOYEE, DELETE_EMPLOYEE, ADD_EMPLOYEE, ADD_SHIFT_TO_EMP, ADD_DEPARTMENT, UPDATE_DEPARTMENT, UPDATE_EMP_DEP, ADD_SHIFT, UPDATE_SHIFT, UPDATE_SHIFT_EMP, LOGIN_USER, UPDATE_USER_ACT, DEC_ACT, DELETE_DEPARTMENT }





