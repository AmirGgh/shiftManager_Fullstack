import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_ALL_ACT, GET_ALL_USERS } from '../../Graphql/Queries'

export default function Users() {
    const [acts, setActs] = useState({})
    const { loadingJSON, errorJSON } = useQuery(GET_ALL_ACT, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (queryData) => {
            setActs(queryData.getAllActs)
        }
    })
    const [users, setusers] = useState({})
    const { loading, error } =
        useQuery(GET_ALL_USERS, {
            fetchPolicy: 'cache-and-network',
            onCompleted: (queryData) => {
                setusers(queryData.getAllUsers)
            }
        })

    if (loading) return "loading.. "
    if (loadingJSON) return "loading.. "
    if (error) return "Error! " + error;
    if (errorJSON) return "Error! " + errorJSON;

    const allowd = (id) => {
        if (acts) {
            const actAlowd = acts?.find((act) => act?.id === id)?.actionAllowd
            if (actAlowd) {
                return actAlowd
            }
            else
                return 0
        }
        else return 'loading'
    }
    return (
        <div>            <h3>Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>user</th>
                        <th>Max Actions</th>
                        <th>Action Allowd</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((u) => (
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td>{u.numOfActions}</td>
                            <td>{allowd(u?.id)}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
