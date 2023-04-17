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
    const users = [{ user: "Bret", email: "Sincere@april.biz" },

    { user: "Antonette", email: "Shanna@melissa.tv" },

    { user: "Samantha", email: "Nathan@yesenia.net" },

    { user: "Karianne", email: "Julianne.OConner@kory.org" },

    { user: "Kamren", email: "Lucio_Hettinger@annie.ca" },

    { user: "Leopoldo_Corkery", email: "Karley_Dach@jasper.info" },

    { user: "Elwyn.Skiles", email: "Telly.Hoeger@billy.biz" },

    { user: "Maxime_Nienow", email: "Sherwood@rosamond.me" },

    { user: "Delphine", email: "Chaim_McDermott@dana.io" }]
    function loginUserCallback() {
        loginUser()
    }
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        username: ''
    })
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
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
    let errLogin = '';
    if (error) {
        errLogin = <h4 style={{ color: 'red' }}>wrong usernam or password</h4>
    }

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
            {errLogin}
            <button type="submit" className="submit-button" onClick={onSubmit}>
                Login
            </button>
            <h3>users:</h3>
            <ul>
                {users.map((user) => (<li key={user.user}><b>user: </b>{user.user}| <b>email: </b>{user.email}</li>))}
            </ul>
        </form>
    );
}

export default Login;
