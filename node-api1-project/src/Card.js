import React from "react";
import axios from "axios";

const Card = ({ data }) => {
  const deleteData = e => {
    axios.delete(`http://localhost:5001/api/users/${data.id}`);
  };
  return (
    <div className='card'>
      <h2>Name: {data.name}</h2>
      <p>Bio: {data.bio}</p>
      <p>Date: {data.created_at}</p>
      <button className='delete' onClick={deleteData}>
        Delete
      </button>
    </div>
  );
};

export default Card;
