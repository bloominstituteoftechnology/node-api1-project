import React, { useState, useReducer, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function deleteUser(id) {
    try {
      const deleted = await axios.delete(`http://localhost:8000/users/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(async () => {
    try {
      const userData = await axios.get("http://localhost:8000/users");
      setLoading(false);
      setUsers(userData.data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }, []);

  return (
    <div className="App">
      {loading && <h1>Loading...</h1>}
      {users.map(user => {
        return (
          <article>
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <button onClick={event => deleteUser(user.id)}>Delete User</button>
          </article>
        );
      })}
    </div>
  );
}

export default App;
