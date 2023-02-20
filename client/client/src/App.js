import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/navbar/navbar';
import Employee from './component/Employee/Employee';
import Department from './component/Department/Department';
import Shifts from './component/Shifts/Shifts';
import Users from './component/Users/Users';
import Login from './component/login/login';
import { useContext, useState } from 'react';
import { AuthContext } from './context/authContext';
import { GET_ALL_USERS } from './Graphql/Queries';
import { useQuery } from '@apollo/client';


export function App() {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState({})

  const [cUser, setCUser] = useState({})
  const curUser = (u) => {
    setCUser(u)
  }
  const { loading, error } =
    useQuery(GET_ALL_USERS, {
      fetchPolicy: 'cache-and-network',
      onCompleted: (queryData) => {
        setUsers(queryData.getAllUsers)
      }
    })
  if (loading) return "loading.. "
  if (error) return "Error! " + error;
  return (
    <div className="App">
      {user && <Navbar cUser={cUser} curUser={curUser} />}
      <Routes>
        {!user ?
          <>
            <Route path='/' element={<Login curUser={curUser} />} />
            <Route path='/login' element={<Login curUser={curUser} />} />
          </>
          : <>
            <Route path='/Employee' element={<Employee cUser={cUser} curUser={curUser} users={users} />} />
            {cUser.numOfActions &&
              <>
                <Route path='/Department' element={<Department cUser={cUser} users={users} />} />
                <Route path='/Shifts' element={<Shifts cUser={cUser} />} />
                <Route path='Users' element={<Users cUser={cUser} />} />
              </>}
          </>
        }
      </Routes>
    </div>
  );
}

