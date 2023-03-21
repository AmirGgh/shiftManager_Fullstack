import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_DEPARTMENT, DELETE_DEPARTMENT, UPDATE_DEPARTMENT, UPDATE_EMPLOYEE, UPDATE_EMP_DEP, UPDATE_SHIFT, UPDATE_USER_ACT } from '../../Graphql/Mutations'
import { GET_SHIFTS_TABLE } from '../../Graphql/Queries'
import { useDecActUser } from '../../Hooks/hook'

export default function DepartmentForm(props) {
    const { dep, emps, addDepartment, cUser, users } = props
    const [depUpdate, setDepUpdate] = useState({})
    const [empDep, setEmpDep] = useState({})
    const [delDep, setDelDep] = useState('')
    const [shifts, setShifts] = useState({})

    const [updateDepartment, { errorUp }] = useMutation(UPDATE_DEPARTMENT)
    const [AddNewDepartment, { errorDe }] = useMutation(ADD_DEPARTMENT)
    const [UpdateEmpDep, { errorEmpDep }] = useMutation(UPDATE_EMP_DEP)
    const [updateUser, { errorUptU }] = useMutation(UPDATE_USER_ACT)
    const [UpdateShift, { errorUpSh }] = useMutation(UPDATE_SHIFT)
    const [UpdateEmp, { errorUpEm }] = useMutation(UPDATE_EMPLOYEE)
    const [deleteDepartment, { errorDeDep }] = useMutation(DELETE_DEPARTMENT)

    const { handleDecActUser } = useDecActUser();
    const handleClick = () => {
        handleDecActUser(cUser.id);
    };
    const { loading, error } =
        useQuery(GET_SHIFTS_TABLE, {
            fetchPolicy: 'cache-and-network',
            onCompleted: (queryData) => {
                setShifts(queryData.getAllShifts)
            }
        })
    if (loading) return "loading.. "
    if (error) return "Error! " + error;

    const updateDep = (e) => {
        e.preventDefault()
        const usersActs = emps.filter((emp) => dep.id === emp.departmentID).map((e) => {
            return { id: users.find((u) => e.userID === u.id).id, u: { numOfActions: depUpdate.numOfActions } }
        })

        updateDepartment({
            variables: {
                id: dep.id,
                dep: depUpdate
            }
        })
        if (errorUp) {
            console.log(errorUp)
        }
        usersActs.forEach(user => {
            console.log(user)
            updateUser({
                variables: user
            })
        });

        if (errorUptU) {
            console.log(errorUptU)
        }
    }
    const UpdateEmpDepId = (e) => {
        e.preventDefault()
        UpdateEmpDep({
            variables: {
                id: empDep.id,
                emp: empDep.emp
            }
        })
        if (errorEmpDep) {
            console.log(errorEmpDep)
        }
        alert('allocated employee successfully')
    }
    const addDep = (e) => {
        e.preventDefault()
        AddNewDepartment({
            variables: {
                dep: depUpdate
            }
        })
        if (errorDe) {
            console.log(errorDe)
        }

    }
    const deleteDep = (e) => {
        e.preventDefault()
        const empIDS = emps.filter((emp) => {
            if (emp.departmentID === delDep) {
                UpdateEmp({
                    variables: {
                        id: emp.id,
                        emp: { departmentID: '', shiftsID: [] }
                    }
                })
                if (errorUpEm) console.log(errorUpEm)
                return true
            } else return false
        }).map((e) => e.id)
        //update employeesID in shift
        shifts.forEach((shift) => {
            const uptEmpId = shift?.employeesID.filter((emp) => !Boolean(empIDS.find((delID) => delID === emp)))
            if (shift.employeesID.length > 0) {
                UpdateShift({
                    variables: {
                        id: shift.id,
                        shif: { employeesID: uptEmpId }
                    }
                })
                if (errorUpSh) {
                    console.log(errorUpSh)
                }
            }
        })
        //delete department 
        deleteDepartment({
            variables: {
                id: delDep
            }
        })
        if (errorDeDep) { console.log(errorDeDep) }
    }


    return (
        <div>
            <hr />
            <form>
                <h4> {addDepartment ? "add deparment" : "update deparment"}</h4>
                {!addDepartment && <div>
                    <label>Department name :
                        <input type="text" defaultValue={dep?.fullName} required onChange={(e) => { setDepUpdate({ ...depUpdate, fullName: e.target.value }) }} />
                    </label><br />
                    <label>Number of actions:
                        <input type="number" defaultValue={dep?.numOfActions} required onChange={(e) => { setDepUpdate({ ...depUpdate, numOfActions: +e.target.value }) }} />
                    </label><br />
                </div>}
                {addDepartment && <div>
                    <label>Department name :
                        <input type="text" onChange={(e) => { setDepUpdate({ ...depUpdate, fullName: e.target.value }) }} />
                    </label><br />
                    <label>Number of actions:
                        <input type="number" defaultValue='0' required onChange={(e) => { setDepUpdate({ ...depUpdate, numOfActions: +e.target.value }) }} />
                    </label><br />
                </div>}
                <label>Department manager : </label>
                <select onChange={(e) => { setDepUpdate({ ...depUpdate, manager: e.target.value }) }} >
                    {!addDepartment && <option key='non'  >{emps?.find((emp) => dep?.manager === emp.id)?.firstName}</option>}
                    {addDepartment && <option key='non' >choose manager</option>}
                    {emps.filter((e) => dep?.manager !== e.id).map((e) => (
                        <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>
                    ))
                    }
                </select>
                <br />
                <br />

                {!addDepartment &&
                    <div>
                        Allocate Employee
                        <br />

                        <select onChange={(e) => { setEmpDep({ id: e.target.value, emp: { departmentID: dep.id } }) }} >
                            <option key='non' >choose employee</option>
                            {!addDepartment && emps.filter((e) => dep.id !== e.departmentID).map((e) => (
                                <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>
                            ))
                            }
                            {addDepartment && emps.map((e) => (
                                <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>
                            ))
                            }
                        </select>
                        <button onClick={(e) => UpdateEmpDepId(e)}>Allocate</button>
                        <br />
                        <br />
                        <button onClick={(e) => { updateDep(e); handleClick(); props.editD(); }}>update</button>
                        {!delDep && <button onClick={(e) => { setDelDep(dep.id); e.preventDefault(e) }}>delete</button>}
                        {delDep && <button onClick={(e) => { deleteDep(e) }}>Confirm Your Deletion</button>}

                    </div>
                }

                {addDepartment && <button onClick={(e) => { addDep(e); handleClick(); }}>add</button>}<br />
            </form>
        </div>
    )
}
