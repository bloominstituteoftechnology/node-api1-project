import React from 'react';
import Card from './Card';
import Users from './Users';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Users</h1>
      <Users />
      <Card />
    </div>
  );
}

export default App;
