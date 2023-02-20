import { gql } from '@apollo/client'
//for employee pages
const GET_ALL_EMP = gql`
query Query {
  getAllEmployees {
    id
    firstName
    lastName
    startWorkYear
    departmentID
    shiftsID
    userID
  }
  getAllDepartments {
    id
    manager
    fullName
    numOfActions
  }
  getAllShifts {
    id
    Date
    Starting
    Ending
    employeesID
  }
}
`

//for department pages
const GET_DEP_TABLE = gql`query getDepTable {
  getAllDepartments {
    id
    fullName
    manager
    numOfActions
  }
  getAllEmployees {
    id
    firstName
    lastName
    departmentID
    userID
    shiftsID
  }
}
`

// for shifts pages
const GET_SHIFTS_TABLE = gql`
query Query {
  getAllShifts {
    id
    Date
    Ending
    Starting
    employeesID
  }
  getAllEmployees {
    id
    firstName
    lastName
    shiftsID
  }
}`

// for users and login pages
const GET_ALL_USERS = gql`query Query {
  getAllUsers {
    id
    username
    numOfActions
    email
  }
}`

const GET_USER_NAME = gql`query GetUser($username: String) {
  getUserByName(username: $username) {
    id
    username
    email
    numOfActions
  }
}`

const GET_ALL_ACT = gql`query Query {
  getAllActs {
    id
    actionAllowd
  }
}`

const GET_ACT_BY_ID = gql`query GetActByUserID($id: ID!) {
  getActByUserID(ID: $id) {
    id
    actionAllowd
  }
}`

export { GET_ALL_EMP, GET_DEP_TABLE, GET_SHIFTS_TABLE, GET_ALL_USERS, GET_USER_NAME, GET_ALL_ACT, GET_ACT_BY_ID }