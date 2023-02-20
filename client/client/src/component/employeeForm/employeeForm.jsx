import React from 'react'
import { ADD_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from '../../Graphql/Mutations'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useDecActUser } from '../../Hooks/hook'
export default function EmployeeForm(props) {
    const { emp, dep, cUser } = props
    const [empUpdate, setEmpUpdate] = useState({})
    const [updateEmployee, { errorUp }] = useMutation(UPDATE_EMPLOYEE)
    const [deleteEmployee, { errorDe }] = useMutation(DELETE_EMPLOYEE)
    const [AddEmployee, { errorAd }] = useMutation(ADD_EMPLOYEE)
    const { handleDecActUser } = useDecActUser();
    const handleClick = () => {
        const res = handleDecActUser(cUser.id);
    };
    const update = () => {
        console.log(cUser)
        updateEmployee({
            variables: {
                id: emp.id,
                emp: empUpdate
            }
        })
        if (errorUp) {
            console.log(errorUp)
        }
    }
    const deleteEmp = () => {
        deleteEmployee({
            variables: {
                id: emp.id
            }
        })
        if (errorDe) {
            console.log(errorDe)
        }
    }
    const addNewEmp = (emp) => {
        AddEmployee({
            variables: {
                emp: { ...emp, userID: cUser.id }
                ,
                id: cUser.id,
                u: {
                    numOfActions: dep.find((d) => d.id === emp.departmentID)?.numOfActions
                }
            }
        })
        if (errorAd) {
            console.log(errorAd)
        }
    }


    return (
        <div>
            <form>
                <label>
                    firstName :
                    <input type="text" name="firstName" defaultValue={emp?.firstName} required onChange={(e) => setEmpUpdate({ ...empUpdate, firstName: e.target.value })} />
                </label>
                <br />
                <label>
                    lastName :
                    <input type="text" name="lastName" defaultValue={emp?.lastName} onChange={(e) => setEmpUpdate({ ...empUpdate, lastName: e.target.value })} />
                </label>
                <br />
                <label>
                    startWorkYear :
                    <input type="number" name="startWorkYear" defaultValue={emp?.startWorkYear} onChange={(e) => {
                        setEmpUpdate({ ...empUpdate, startWorkYear: +e.target.value })
                    }} />
                </label>
                <br />

                <label>
                    department :
                </label>
                <select onChange={(e) => {
                    setEmpUpdate({ ...empUpdate, departmentID: e.target.value })
                }
                } >
                    {!props.addEmp && <option key='non'  >{dep.filter((d) => emp?.departmentID == d.id)[0]?.fullName}</option>}
                    {props.addEmp && <option key='non' >choose department</option>}
                    {dep?.filter((d) => emp?.departmentID !== d.id).map((d) => (
                        <option key={d.id} value={d.id}>{d.fullName}</option>
                    ))
                    }
                </select>
                <br />
                {!props.addEmp && <div>
                    <input type="submit" value="Update" onClick={(e) => { e.preventDefault(); update(); handleClick(); }} />
                    <input type="submit" value="Delete" onClick={() => { deleteEmp(); handleClick(); }} />
                </div>}
                {props.addEmp && <div>
                    <input type="submit" value="Add Employee" onClick={(e) => { addNewEmp(empUpdate); handleClick(); }} />
                    <button onClick={() => props.toggleAdd()} >Cancel</button>
                </div>}
            </form >

        </div >
    )
}

// 