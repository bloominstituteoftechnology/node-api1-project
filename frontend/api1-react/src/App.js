import React, { useState, useEffect } from "react";
import UserCard from "./components/UserCard.js";

import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(users);

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} name={user.name} bio={user.bio} />
      ))}
    </div>
  );
}

export default App;
