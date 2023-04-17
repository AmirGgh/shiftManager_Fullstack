import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import '../../generalStyle/gStyle.css'
import { GET_DEP_TABLE } from '../../Graphql/Queries'
import DepartmentForm from '../deparmentForm/DepartmentForm'
export default function Department(props) {
    const [employees, setEmployees] = useState({})
    const [departments, setDepartments] = useState({})

    const [addDepartment, setAddDepartment] = useState(false)
    const [editDep, setEditDep] = useState(false)
    const [editDepartment, setEditDepartment] = useState({})
    const { loading, error } =
        useQuery(GET_DEP_TABLE, {
            fetchPolicy: 'cache-and-network',
            onCompleted: (queryData) => {
                setEmployees(queryData.getAllEmployees)
                setDepartments(queryData.getAllDepartments)
            }
        })
    if (loading) return "loading.. "
    if (error) return <div>"Error! " + {error}</div>
    const editD = () => {
        setEditDep(!editDep)
    }
    return (
        <div>
            <h3>Department</h3>
            <p>Create new department, change existing department by click on the name, and
                allocate employees to any department.</p>
            <table>
                <thead>
                    <tr>
                        <th>Department name</th>
                        <th>Department manager</th>
                        <th>Employees</th>
                    </tr>
                </thead>
                <tbody>
                    {departments?.map((dep) => (
                        <tr key={dep.id}>
                            <td style={{ textDecoration: 'underline' }} className='tdh' onClick={() => {
                                setEditDep(!editDep)
                                setEditDepartment(dep)
                            }}>{dep.fullName}</td>
                            <td>{employees?.find((emp) => dep.manager === emp.id)?.firstName}</td>
                            <td>
                                <ul>
                                    {employees?.filter((emp) => dep.id === emp.departmentID).map((e) => { return (<li key={e.id}>{e.firstName} {e.lastName}</li>) })}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />

            {(editDep || addDepartment) && <DepartmentForm dep={editDepartment} emps={employees} deps={departments} addDepartment={addDepartment} users={props.users} cUser={props.cUser} editD={editD} />}
            {(!editDep && !addDepartment) && <button onClick={() => setAddDepartment(!addDepartment)}>Add New Department</button>}
            <br />
            {(editDep && !addDepartment) && <button onClick={editD}>Cancel Update Department</button>}
            {(addDepartment) && <button onClick={() => setAddDepartment(!addDepartment)}>Cancel Add Department</button>}
        </div >
    )
}
