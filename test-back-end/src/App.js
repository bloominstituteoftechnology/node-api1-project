import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formInput, setFormInput] = useState({
    name: null,
    bio: null
  });

  const [data, setData] = useState([]);

  const onValueChange = event => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users")

      .then(data => {
        console.log(data);
        setData(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [data]);

  const onHandleSubmit = (event, newDude) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/users", newDude)
      .then(data => {
        setFormInput({
          name: "",
          bio: ""
        });
        console.log(data);
      })

      .catch(err => err);
  };

  const DeleteUser = (event, id) => {
    event.preventDefault();

    axios
      .delete(`http://127.0.0.1:8000/api/users/${id}`)
      .then(data => {
        console.log(data);
      })

      .catch(err => err);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={event => onHandleSubmit(event, formInput)}>
          <p>{formInput.name}</p>
          <p>{formInput.bio}</p>
          <label>
            Tell us your story
            <br />
            <input
              type="text"
              placeholder="type in your name"
              value={formInput.name}
              name="name"
              onChange={onValueChange}
            />
            <br />
            <input
              type="text"
              placeholder="bio goes here"
              name="bio"
              value={formInput.bio}
              onChange={onValueChange}
            />
          </label>

          <button type="submit">Submit your story</button>
        </form>

        {data.map(user => {
          return (
            <div
              style={{
                width: "50%",
                height: "100%",
                background: "purple",
                margin: "20px",
                borderRadius: "15px",
                boxShadow: "10px 5px 5px pink"
              }}
            >
              <h2>Name: {user.name}</h2>
              <p>Story: {user.bio}</p>
              <p>Id: {user.id}</p>

              <button onClick={event => DeleteUser(event, user.id)}>
                Delete this user
              </button>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
