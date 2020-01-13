import React, { useState, useReducer, useEffect } from "react";
import "./App.css";
import axios from "axios";
import User from "./components/User";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [changeMade, setChangeMade] = useState();

  async function deleteUser(id) {
    try {
      const deleted = await axios.delete(`http://localhost:8000/users/${id}`);
      setUsers(users.filter(elem => elem.id !== id));
      console.log(deleted);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await axios.get("http://localhost:8000/users");
        setLoading(false);
        setUsers(userData.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }
    getUserData();
  }, [changeMade]);

  return (
    <div className="App">
      {loading && <h1>Loading...</h1>}
      <UserForm setChangeMade={setChangeMade} />
      {users.map(user => {
        return <User user={user} deleteUser={deleteUser} key = {user.id} setChangeMade={setChangeMade}/>;
      })}
    </div>
  );
}

export default App;
