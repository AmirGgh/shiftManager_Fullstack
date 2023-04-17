import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { useDecActUser } from '../../Hooks/hook';
import './style.css';

const Navbar = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };
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
        <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>

                <i className="menu-icon" onClick={handleMenuToggle}>&#9776;</i>
                <ul className={isMenuOpen ? 'open' : ''}>
                    {user &&
                        <> <li onClick={onLogout} sx={{ justifyContent: 'start' }}>
                            <Link to="/login" >Logout - {user.username}</Link>
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

                        </>

                    }
                </ul>
            </div>

            {isMenuOpen && <div className="backdrop" onClick={handleCloseMenu}></div>}
        </nav>
    );
};

export default Navbar;




//     return (
//         <nav>
//             <ul>
//                 {user ?
//                     <>
//                         <li>
//                             user: {user.username}
//                         </li>
//                         <li>
//                             <Link to="/Employee" >Employee</Link>
//                         </li>
//                         {props.cUser.numOfActions && <>
//                             <li>
//                                 <Link to="/department" onClick={() => handleClick(props.cUser.id)}>Department</Link>
//                             </li>
//                             <li>
//                                 <Link to="/shifts" onClick={() => handleClick(props.cUser.id)} >Shifts</Link>
//                             </li>
//                             <li>
//                                 <Link to="/users" onClick={() => handleClick(props.cUser.id)}>Users</Link>
//                             </li>
//                         </>
//                         }
//                         <li onClick={onLogout}>
//                             <Link to="/login" >Logout</Link>
//                         </li>
//                     </> :
//                     <>
//                         <li>
//                             <Link to="/login">login</Link>
//                         </li>
//                     </>
//                 }

//             </ul>
//         </nav>
//     );