import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom';
import UsersList from './components/UsersList';

function App() {
  return (
    <div className="App">
      <h1>hello from the app</h1>
      <Route path='/api/users' component={UsersList}/>
    </div>
  );
}

export default App;
