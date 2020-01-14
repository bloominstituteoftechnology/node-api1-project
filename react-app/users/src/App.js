import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Users from './components/Users';
import User from './components/User';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
    <div className="App">
      <h1>The Chronicles of Narnia</h1>
      <Route exact path="/users" component={Users} />
      <Route path="/users/:id" render={props => {
        return <User {...props} />
      }} />
      <Route path="/update-user/:id" render={props => {
        return <UpdateUser {...props} />
      }} />
    </div>
  );
}

export default App;
