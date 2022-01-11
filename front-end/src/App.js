import "./App.css";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  axios
    .get("http://localhost:9000/api/users")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className='App'>
      <form>
        <input placeholder='name' />
        <input placeholder='bio' />
        <button>Add</button>
        <button>Delete</button>
      </form>
      {users.map((user) => (
        <div>{user.name}</div>
      ))}
    </div>
  );
}

export default App;
