import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from "axios";

import { Input, Typography, Button } from "@material-ui/core";

function App() {
  const [ users, setUsers ] = useState([])
  const [ verb, setVerb ] = useState("post")
  const [ form, setForm ] = useState({ name: "", bio: "" })
  const [ title, setTitle ] = useState("")

  useEffect(() => {
    const buttonText = document.getElementsByName(verb)[0].textContent
    setTitle(buttonText)
    if (users.length === 0) {
      axios.get("localhost:5000/api/users")
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }

  }, [verb])

  const handleOnChange = e => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="App">
        <Typography variant="h4">
          {title}
        </Typography>
        <label>Name</label>
        <Input type="text" name="name" value={form.name} onChange={handleOnChange}/>
        <label>Bio</label>
        <Input type="text" name="bio" value={form.bio} onChange={handleOnChange}/>
        <Button variant="contained" color={verb === "post" ? "primary" : "inherit"} name="post" onClick={() => setVerb("post")}>Add user</Button>
        <Button variant="contained" color={verb === "get" ? "primary" : "inherit"} name="get" onClick={() => setVerb("get")}>Get user</Button>
        <Button variant="contained" color={verb === "delete" ? "primary" : "inherit"} name="delete" onClick={() => setVerb("delete")}>Delete user</Button>
        <Button variant="contained" color={verb === "put" ? "primary" : "inherit"} name="put" onClick={() => setVerb("put")}>Edit user</Button>
    </div>
  );
}

export default App;
