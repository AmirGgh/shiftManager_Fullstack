import React from 'react'

export default function EmployeeShifts(props) {
    const { shifts } = props

    return (
        <div>
            <h3>Employee Shifts</h3>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>day</th>
                            <th>hour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shifts.map((s) => (
                            <tr key={s.id}>
                                <td>{s.Date}:</td>
                                <td>{s.Starting} - {s.Ending}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>

        </div>

    )
}


