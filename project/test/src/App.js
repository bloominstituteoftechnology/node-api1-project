import React, { useState, useEffect } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  const [formValues, setFormValues] = useState({
    name: '',
    bio: ''
  })
  const [userList, setUserList] = useState([])
  const [needToUpdate, setNeedToUpdate] = useState(true)
  const [editingUser, setEditingUser] = useState(false)

  useEffect(() => {
    if(needToUpdate) {
      axios.get('http://localhost:5000/api/users')
      .then(res => {
        setUserList(res.data)
        setNeedToUpdate(false)
      })
      .catch(err => console.log(err))
    }
    
  },[needToUpdate])

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(editingUser === false) {
      axios.post('http://localhost:5000/api/users', formValues)
      .then(res => {
        setFormValues({
          name: '',
          bio: ''
        })
        setNeedToUpdate(true)
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      axios.put(`http://localhost:5000/api/users/${editingUser}`, formValues)
      .then(res => {
        setFormValues({
          name: '',
          bio: ''
        })
        setNeedToUpdate(true)
        setEditingUser(false)
      })
      .catch(err => {
        console.log(err);
      })
    }

  }
  const handleEdit = (id, name, bio) => {
    setEditingUser(id)
    setFormValues({
      name: name,
      bio: bio
    })
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        setNeedToUpdate(true)
      })
      .catch(err => {
        console.log(err);
      })
    }



  return (
    <div className="App">
      <form onSubmit={handleSubmit} 
        style={
          { 
            width: 300,
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }
        }>
        <h3>User Register</h3>  
        <h4>Name:</h4>
        <input type="text" name='name' value={formValues.name} onChange={handleInputChange} />
        <h4>Bio:</h4>
        <input type="text" name='bio' value={formValues.bio} onChange={handleInputChange} />
        <button type="submit">Enviar</button>
      </form>

      <div>
        {
          userList.map(user => (
            <div>
              <p>Name: {user.name}</p>
            	<p>Bio: {user.bio}</p>
              <button onClick={() => {handleEdit(user.id, user.name, user.bio)}}>edit</button>
              <button onClick={() => {handleDelete(user.id)}}>delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
