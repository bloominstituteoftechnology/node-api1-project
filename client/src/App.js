import React, {useEffect, useState, createContext} from 'react';
import axios from "axios";

import AddUser from "./components/AddUser";
import Users from "./components/Users";

export const UsersContext = createContext();

function App() {
  const [users, setUsers] = useState();
  useEffect(()=>{
    setUsers("loading");
    axios.get("http://localhost:5000/api/users").then(({data})=>{
      setUsers(data);
    }).catch(err=>{
      console.log(err);
    })
  }, [])

  return (
    <div className="App">
      <header>
        <h1>User List</h1>
      </header>
      <UsersContext.Provider value={{users: users, setUsers: setUsers}}>
        <AddUser/>
        <div className="users">
          {users === "loading" &&
              <div>loading users...</div>
          }
          <Users/>
        </div>
      </UsersContext.Provider>
    </div>
  );
}

export default App;