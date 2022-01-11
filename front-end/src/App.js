import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Users from "./Users";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    bio: "",
  });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
    console.log(newUser);
  };

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/api/users", newUser)
      .then((res) => {
        setNewUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='App'>
      <form>
        <input
          onChange={handleChange}
          name='name'
          value={newUser.name}
          placeholder='name'
        />
        <input
          onChange={handleChange}
          name='bio'
          value={newUser.bio}
          placeholder='bio'
        />
        <button onClick={handleSubmit}>Add</button>
        <button>Delete</button>
      </form>
      {users.map((user) => (
        <Users key={user.id} user={user} setUsers={setUsers} />
      ))}
    </div>
  );
}

export default App;
