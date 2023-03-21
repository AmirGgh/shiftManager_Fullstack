import React, { useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_EMP, GET_USER_NAME } from '../../Graphql/Queries'
import { useState } from 'react'
import EmployeeShifts from '../EmployeeShifts/EmployeeShifts'
import './styleEmp.css'
import '../../generalStyle/gStyle.css'
import EmployeeForm from '../employeeForm/employeeForm'
import { ADD_SHIFT_TO_EMP } from '../../Graphql/Mutations'
import DepartmentForm from '../deparmentForm/DepartmentForm'
import { AuthContext } from '../../context/authContext'
export default function Employee(props) {
    const { user } = useContext(AuthContext)

    const [employees, setEmployees] = useState({})
    const [departments, setdepartments] = useState({})
    const [shifts, setShifts] = useState({})

    const [showMenu, setShowMenu] = useState(false);
    const [addEmp, setAddEmp] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showEditDep, setShowEditDep] = useState(false);
    const [aceptAdd, setAceptAdd] = useState(false);
    const [editEmp, setEditEmp] = useState({ emp: 'non' })
    const [selectedOption, setSelectedOption] = useState({ fullName: "all" });

    const [addShifts, setAddShifts] = useState({})
    const [editDepartment, setEditDepartment] = useState({})

    const [updateEmpShift, { errorSh }] = useMutation(ADD_SHIFT_TO_EMP)
    useQuery(GET_USER_NAME, {
        variables: { username: user.username },
        fetchPolicy: 'cache-and-network',
        onCompleted: (queryData) => {
            props.curUser(queryData.getUserByName)
        }
    })

    const { loading, error } =
        useQuery(GET_ALL_EMP, {
            fetchPolicy: 'cache-and-network',
            onCompleted: (queryData) => {
                setEmployees(queryData.getAllEmployees)
                setdepartments(queryData.getAllDepartments)
                setShifts(queryData.getAllShifts)
            }
        })
    if (loading) return "loading.. "
    if (error) return "Error! " + error;


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const toggleAdd = () => {
        setAddEmp(!addEmp);
    };
    const handleOptionSelection = (option) => {
        setSelectedOption(option);
        toggleMenu();
    };
    const empShifts = (emp) => {
        return emp.shiftsID.map((shift) => shifts.filter((s) => s.id === shift)).map((s) => s[0])
    }
    const cancelEdit = () => {
        setEditEmp({ emp: 'non' })
        setShowEdit(!showEdit);
    }
    const addThisShift = (editEmp) => {
        alert('new shift added')
        updateEmpShift({
            variables: {
                "id": editEmp.id,
                "emp": {
                    "shiftsID": [...editEmp.shiftsID, addShifts]
                },
                "updateShiftId2": addShifts,
                "shif": {
                    "employeesID": [...(shifts.find((s) => s.id === addShifts)?.employeesID), editEmp.id]
                }
            }
        })
        if (errorSh) {
            console.log(errorSh)
        }

    }
    return (
        <div>
            {props.cUser.numOfActions && <>
                <h3>Employees</h3>
                <div>
                    <p>Create new employees, change existing employee and department by click on the name, and
                        registaer employees to any shift.</p>
                    <div onClick={toggleMenu}>chose department - {selectedOption?.fullName}</div>
                    {showMenu && (
                        <ul>
                            {departments.map((dep) => {
                                return (
                                    <li key={dep.id} onClick={() => handleOptionSelection(dep)}>{dep.fullName}</li>
                                )
                            })}
                            <li key='all' onClick={() => handleOptionSelection({ fullName: "all" })}>ALL</li>

                        </ul>
                    )}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Department</th>
                            <th>Shifts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.filter((emp) => {
                            if (selectedOption.fullName === 'all')
                                return emp
                            else return selectedOption.id === emp.departmentID
                        }).map((emp) => (
                            <tr key={emp.firstName}>
                                <td onClick={() => {
                                    if (!addEmp && !showEditDep) {
                                        setEditEmp(emp)
                                        setShowEdit(!showEdit)
                                    }
                                }}>{emp.firstName} {emp.lastName}</td>
                                <td onClick={(e) => {
                                    if (!addEmp && !showEdit) {
                                        setShowEditDep(!showEditDep)
                                        setEditDepartment(departments.find((d) => (emp.departmentID) === (d.id)))
                                    }
                                }}>{departments.find((d) => (emp.departmentID) === (d.id))?.fullName}</td>
                                <td>{empShifts(emp).map((s) => {
                                    return (s.Date + ' ')
                                })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />


                {editEmp.emp !== 'non' && showEdit &&
                    <div>
                        <select onChange={(e) => {
                            console.log(editEmp)
                            setAddShifts(e.target.value)
                            setAceptAdd(aceptAdd)
                        }} >
                            <option key='non' >choose shift</option>
                            {shifts.filter((shift) => !Boolean(editEmp?.shiftsID.find((s) => s === shift.id))).map((s) => (
                                <option key={s.id} value={s.id}>{s.Date} -{s.Starting} to {s.Ending}</option>
                            ))
                            }
                        </select>
                        <button onClick={() => {
                            addThisShift(editEmp)
                        }}> register to shift</button>
                        {!editEmp?.shiftsID.length === 0 && <EmployeeShifts shifts={empShifts(editEmp)} emp={editEmp} dep={departments} addEmp={addEmp} />}
                        <h3>Edit Employee</h3>

                        <EmployeeForm emp={editEmp} dep={departments} addEmp={addEmp} cUser={props.cUser} />
                        <button onClick={() => cancelEdit()} >Cancel Edit</button>
                        <hr />
                    </div>
                }
            </>}
            {(!addEmp && !showEditDep && !showEdit) && <button onClick={() => setAddEmp(!addEmp)}>Add New Employee</button>}
            {(addEmp) && <EmployeeForm toggleAdd={toggleAdd} addEmp={addEmp} dep={departments} cUser={props.cUser} />}
            {(showEditDep) && <DepartmentForm dep={editDepartment} emps={employees} deps={departments} addDepartment={false} cUser={props.cUser} users={props.users} />}
            {(showEditDep || addEmp) && <button onClick={() => {
                setAddEmp(false)
                setShowEditDep(false)
                setShowEdit(false)
            }}>Cancel </button>}

        </div>
    )
}
