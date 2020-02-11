import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const User  = () => {
  const [user, setUser] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:5001/api/users`)
    .then(res => {
      console.log(res)
      setUser(res.data)
    })
  }, 0)

    return (
      <div className='cardHolder'>
        {user.map(user => (
          <div key={user.id}>
            <Card data={user} />
          </div>
        ))}
      </div>
    )
}

export default User;