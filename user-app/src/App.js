import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MemberForm from './form.js'
import Axios from 'axios';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

function App() {
  const [users, setUsers] = useState([])
 
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
    .then( res => {
      // console.log(res)
      setUsers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  const memberSubmit = (post) => {
    Axios.post('http://localhost:5000/api/users', post)
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
}

  const deleteIt = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
    .then( res => setUsers(res.data))
    .catch( err => console.log(err))
  }

  return (
    <div className='width'>
      <MemberForm submit={memberSubmit}/>
      {users.map(user => {
      return(
      <Card body>
        <CardTitle>{user.name}</CardTitle>
        <CardText>{user.bio}</CardText>
        <Button onClick={() => deleteIt(user.id)}>Delete</Button>
      </Card>

      )})}
    </div>
  );
}

export default App;
