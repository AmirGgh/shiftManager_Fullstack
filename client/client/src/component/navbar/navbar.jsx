import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { useDecActUser } from '../../Hooks/hook';
import './style.css';

const Navbar = (props) => {
    const { user, logout } = useContext(AuthContext)
    let navigate = useNavigate()

    const onLogout = () => {
        logout()
        navigate('/login')
        props.curUser({})
    }
    const { handleDecActUser } = useDecActUser();

    const handleClick = (id) => {
        handleDecActUser(id);
    };
    return (
        <nav>
            <ul>
                {user ?
                    <>
                        <li>
                            user: {user.username}
                        </li>
                        <li>
                            <Link to="/Employee" >Employee</Link>
                        </li>
                        {props.cUser.numOfActions && <>
                            <li>
                                <Link to="/department" onClick={() => handleClick(props.cUser.id)}>Department</Link>
                            </li>
                            <li>
                                <Link to="/shifts" onClick={() => handleClick(props.cUser.id)} >Shifts</Link>
                            </li>
                            <li>
                                <Link to="/users" onClick={() => handleClick(props.cUser.id)}>Users</Link>
                            </li>
                        </>
                        }
                        <li onClick={onLogout}>
                            <Link to="/login" >Logout</Link>
                        </li>
                    </> :
                    <>
                        <li>
                            <Link to="/login">login</Link>
                        </li>
                    </>
                }

            </ul>
        </nav>
    );
};

export default Navbar;