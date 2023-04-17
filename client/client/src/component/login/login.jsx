import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../Hooks/hook';
import './style.css';
import { LOGIN_USER } from '../../Graphql/Mutations';
import { useMutation } from '@apollo/client';


function Login(props) {
    let navigate = useNavigate()
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState([])

    function loginUserCallback() {
        loginUser()
    }
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        username: ''
    })
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData } }) {
            context.login(userData)
            navigate('/Employee')
            props.getCUser({ variables: { username: context.user?.username } })
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { loginInput: values }
    })

    return (
        <form className="login-form">
            <h1 className="login-title">Login</h1>
            <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                    name="username"
                    type="text"
                    id="username"
                    onChange={onChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    name="email"
                    type="email"
                    id="email"
                    onChange={onChange}
                />
            </div>
            <button type="submit" className="submit-button" onClick={onSubmit}>
                Login
            </button>
        </form>
    );
}

export default Login;
