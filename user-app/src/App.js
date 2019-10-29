import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Users from '../src/components/Users'
import axios from 'axios'

function App() {
  const baseURL = 'http://localhost:8000/api/users' 
  const [users, setUsers] = useState([])
  const [render, setRender] = useState(false)

  useEffect(()=>{
    axios(baseURL)
    .then(res=>setUsers(...[res.data]))
    .catch(err=>console.log(err))
  },[render])

  return (
    <div className="App">
      <Users users={users} setRender={setRender} render={render}/>
    </div>
  );
}

export default App;
