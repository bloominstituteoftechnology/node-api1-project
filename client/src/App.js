import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState()

  useEffect(() => {
    axios
      .get(`http://localhost:4534/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.log('App: useEffect: GET: err=', err))
  }, [])
  return (
    <div className="App">

    </div>
  );
}

export default App;
