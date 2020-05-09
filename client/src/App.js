import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";

import {
  Input,
  Typography,
  Button,
  Card,
  CardContent
} from "@material-ui/core";

const initData = { name: "", bio: "", id: "" };
function App() {

  const [users, setUsers] = useState([]);
  const [verb, setVerb] = useState("post");
  const [form, setForm] = useState(initData);
  const [title, setTitle] = useState("");

  const getUsers = (id="") => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const buttonText = document.getElementsByName(verb)[0].textContent;
    setTitle(buttonText);
    setForm(initData)
    if (users.length === 0) {
      getUsers();
    }
  }, [verb]);

  const handleOnChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    axios[verb](`http://localhost:5000/api/users/${form.id}`, form)
      .then(res => {
        setForm(initData)
        if (verb === "get") {
          return getUsers(form.id)
        }
        getUsers()
      })
      .catch(err => console.log(err));
  };

  return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
      <form onSubmit={handleOnSubmit} style={{ display: "flex", flexDirection: "column", width: 200, padding: 20, height: 600, justifyContent: "space-between"}}>
        <Typography variant="h4">{title}</Typography>
        <label>Name</label>
        <Input
          type="text"
          name="name"
          value={form.name}
          onChange={handleOnChange}
          disabled={verb === "delete" || verb === "get" ? true : false}
        />
        <label>Bio</label>
        <Input
          type="text"
          name="bio"
          value={form.bio}
          onChange={handleOnChange}
          disabled={verb === "delete" || verb === "get" ? true : false}
        />
        <label>Id</label>
        <Input
          type="text"
          name="id"
          value={form.id}
          onChange={handleOnChange}
          disabled={verb === "post" ? true : false}
        />
        <Button
          type="button"
          variant="contained"
          color={verb === "post" ? "primary" : "inherit"}
          name="post"
          onClick={() => setVerb("post")}
        >
          Add user
        </Button>
        <Button
          type="button"
          variant="contained"
          color={verb === "get" ? "primary" : "inherit"}
          name="get"
          onClick={() => setVerb("get")}
        >
          Get user
        </Button>
        <Button
          type="button"
          variant="contained"
          color={verb === "delete" ? "primary" : "inherit"}
          name="delete"
          onClick={() => setVerb("delete")}
        >
          Delete user
        </Button>
        <Button
          type="button"
          variant="contained"
          color={verb === "put" ? "primary" : "inherit"}
          name="put"
          onClick={() => setVerb("put")}
        >
          Edit user
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </form>
    <div className="App" style={{ display: "flex", flexWrap: "wrap", width: 1500 }}>
      {users &&
        users.map(user => {
          return (
            <Card key={user.id} style={{ width: 200, height: 200, margin: 20 }}>
              <CardContent>
                <Typography variant="h5">{user.name}</Typography>
                <Typography>Bio: {user.bio}</Typography>
              </CardContent>
            </Card>
          );
        })}
    </div>
    </div>
  );
}

export default App;
