import React, { useState, useReducer } from "react";
import Axios from "axios";

function formReducer(state, action) {
  switch (action.type) {
    case "input":
      return { ...state, [action.payload.field]: action.payload.value };

    default:
      return state;
  }
}

export default function UserForm({ setChangeMade, editing, userToEdit, setEditing }) {
  const [state, dispatch] = useReducer(formReducer, userToEdit? userToEdit: { name: "", bio: "" });
  console.log(userToEdit);
  
  async function onSubmit(e) {
    e.preventDefault();
    try {
        if(editing){
            const updatedUser = await Axios.put(`http://localhost:8000/users/${userToEdit.id}`, state);
            console.log(updatedUser);
            setEditing(false);
            setChangeMade(Date.now());
        }else{
            const newUser = await Axios.post("http://localhost:8000/users", state);
            console.log(newUser);
            setChangeMade(newUser.id);
        }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">
        <input
        defaultValue={userToEdit?userToEdit.name:""}
          value={state.name}
          onChange={e =>
            dispatch({
              type: "input",
              payload: { field: e.target.name, value: e.target.value }
            })
          }
          type="text"
          name="name"
          id="name"
          placeholder="User name"
        />
      </label>
      <label htmlFor="bio">
        <input
        defaultValue={userToEdit?userToEdit.bio:""}
          value={state.bio}
          onChange={e =>
            dispatch({
              type: "input",
              payload: { field: e.target.name, value: e.target.value }
            })
          }
          type="text"
          name="bio"
          id="bio"
          placeholder="User bio"
        />
      </label>
      <button type="submit">Submit new user</button>
    </form>
  );
}
