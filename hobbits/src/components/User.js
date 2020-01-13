import React, { useState } from "react";
import UserForm from "./UserForm";

export default function User({ user, deleteUser, setChangeMade }) {
  const [editing, setEditing] = useState(false);
  return (
    <article>
      <p>{user.name}</p>
      <p>{user.bio}</p>
      <button onClick={event => deleteUser(user.id)}>Delete User</button>
      <button onClick={event => setEditing(!editing)}>Edit User</button>
      {editing && (
        <UserForm
          editing={editing}
          userToEdit={user}
          setChangeMade={setChangeMade}
          setEditing={setEditing}
        />
      )}
    </article>
  );
}
