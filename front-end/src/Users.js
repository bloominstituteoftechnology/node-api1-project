import axios from "axios";
import React from "react";

const Users = ({ user, setUsers }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:9000/api/users/${user.id}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='users'>
      {user.name}
      <button onClick={handleDelete} className='button'>
        Delete
      </button>
    </div>
  );
};

export default Users;
