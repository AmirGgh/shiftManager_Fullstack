import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_SHIFT, UPDATE_SHIFT, UPDATE_SHIFT_EMP } from '../../Graphql/Mutations'
import { GET_SHIFTS_TABLE } from '../../Graphql/Queries'
import { useDecActUser } from '../../Hooks/hook'

export default function Shifts(props) {
    const [employees, setEmployees] = useState({})
    const [shifts, setShifts] = useState({})
    const [editShifts, setEditShifts] = useState(false)
    const [addShifts, setAddShifts] = useState(false)
    const [updateShift, setUpdateShift] = useState({})
    const [updateShToEmp, setUpdateShToEmp] = useState({})
    const [updateThisShift, { errorShUp }] = useMutation(UPDATE_SHIFT)
    const [AddNewShift, { errorAdSh }] = useMutation(ADD_SHIFT)
    const [UpdateShiftToEmp, { errorUpShEm }] = useMutation(UPDATE_SHIFT_EMP)

    const { handleDecActUser } = useDecActUser();
    const handleClick = () => {
        handleDecActUser(props.cUser.id);
    };

    const shiftUpdate = () => {
        const { id, Date, Ending, Starting } = updateShift
        updateThisShift({
            variables: {
                id,
                shif: { Date, Ending, Starting }
            }
        })
        if (errorShUp) {
            console.log(errorShUp)
        }
    }
    const shiftToEmpUpdate = () => {
        // update the arrays employeesID when employee added to shift or deleted from shift 
        console.log(updateShToEmp)
        UpdateShiftToEmp({
            variables: updateShToEmp
        })
        if (errorUpShEm) {
            console.log(errorUpShEm)
        }
    }
    const addNewShift = () => {
        AddNewShift({
            variables: {
                shif: updateShift
            }
        })
        if (errorAdSh) {
            console.log(errorAdSh)
        }
    }

    const { loading, error } =
        useQuery(GET_SHIFTS_TABLE, {
            fetchPolicy: 'cache-and-network',
            onCompleted: (queryData) => {
                setEmployees(queryData.getAllEmployees)
                setShifts(queryData.getAllShifts)
            }
        })
    if (loading) return "loading.. "
    if (error) return "Error! " + error;

    return (
        <div>
            <h3>Shifts</h3>
            <p>Create new shifts, change existing shift by click the day, and
                allocate employees to a given shift.</p>
            <p> You can remove employees from shift, but you can't remove shift.</p>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Hours</th>
                        <th>Employees</th>
                    </tr>
                </thead>
                <tbody>
                    {shifts?.map((s) => (
                        <tr key={s.id}>
                            <td style={{ textDecoration: 'underline' }} className='tdh' onClick={() => {
                                if (!addShifts) {
                                    setUpdateShift(s)
                                    setEditShifts(!editShifts)
                                }
                            }}>{s.Date}</td>
                            <td>{s.Starting} - {s.Ending}</td>
                            <td>{employees?.map((emp) => Boolean(emp.shiftsID.filter((shiftId) => shiftId === s.id).length > 0) && emp.firstName + ' ')}</td>
                        </tr>))}
                </tbody>
            </table>
            {(!editShifts && !addShifts) && <button onClick={() => {
                setUpdateShift({})
                setAddShifts(!addShifts)
            }}>Add Shift</button>}
            {(editShifts || addShifts) && <div>
                {(editShifts && !addShifts) && <h4> Edit Shift  </h4>}
                {(addShifts && !editShifts) && <h4> Add Shift</h4>}
                <form>
                    <label>
                        day :
                        <input type="text" defaultValue={updateShift?.Date} required onChange={(e) => setUpdateShift({ ...updateShift, Date: e.target.value })} />
                    </label>
                    <br />
                    <label>
                        starting :
                        <input type="text" defaultValue={updateShift?.Starting} required onChange={(e) => setUpdateShift({ ...updateShift, Starting: +e.target.value })} />
                    </label>
                    <br />
                    <label>
                        ending :
                        <input type="text" defaultValue={updateShift?.Ending} required onChange={(e) => setUpdateShift({ ...updateShift, Ending: +e.target.value })} />
                    </label>
                    <br />

                </form>

                {editShifts &&
                    <div>

                        <br />

                        <select onChange={(e) => {
                            setUpdateShToEmp(
                                {
                                    id: updateShift.id,
                                    shif:
                                        { employeesID: [...updateShift.employeesID, e.target.value] },
                                    updateEmployeeId2: e.target.value,
                                    emp:
                                        { shiftsID: [...employees.find((empl) => empl.id === e.target.value)?.shiftsID, updateShift.id] }
                                }
                            )

                        }} >
                            <option key='non' >choose employee</option>
                            {(editShifts && !addShifts) && employees.filter((e) => !e.shiftsID.find((s) => s === updateShift.id)).map((e) => (
                                <option key={e.id} value={e.id}>{e.firstName}</option>
                            ))
                            }
                        </select>
                        <button onClick={shiftToEmpUpdate}>add to shift</button>
                        <br />

                        <select onChange={(e) => setUpdateShToEmp({
                            test: 'test',
                            id: updateShift.id,
                            shif: { employeesID: updateShift.employeesID.filter((empId) => empId !== e.target.value) },
                            updateEmployeeId2: e.target.value,
                            emp: { shiftsID: employees.find((empl) => empl.id === updateShToEmp.updateEmployeeId2)?.shiftsID.filter((shId) => shId !== updateShift.id) }
                        })} >
                            <option key='non' >choose employee</option>
                            {(editShifts && !addShifts) && employees.filter((e) => e.shiftsID.find((s) => s === updateShift.id)).map((e) => (
                                <option key={e.id} value={e.id}>{e.firstName}</option>
                            ))
                            }
                        </select>
                        <button onClick={() => { shiftToEmpUpdate(); handleClick(); }}>delete from shift</button>
                        <br />
                        <br />
                        <button onClick={() => {
                            shiftUpdate()
                            setEditShifts(false)
                            setAddShifts(false)
                            handleClick();
                        }}>update</button>
                    </div>
                }
                {addShifts && <button onClick={() => { addNewShift(); handleClick() }}>add</button>}
                <button onClick={() => {
                    setEditShifts(false)
                    setAddShifts(false)
                }
                }>Cancel</button>
            </div>}

        </div >
    )
}
