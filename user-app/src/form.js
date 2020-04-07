import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



function MemberForm(props) {

   console.log(props)

    const [newMember, setNewMember] = useState({
        name: '',
        bio: ''
    });

    const handleChanges = e => {
        setNewMember({...newMember, [e.target.name]: e.target.value})
        console.log(newMember)
    }

    return (
        // <div>
        //     <input 
        //     type='text' 
        //     name='name' 
        //     value={newMember.name} 
        //     onChange={handleChanges} 
        //     placeholder='Name' />
        //     <input  
        //     type='text' 
        //     name='bio' 
        //     value={newMember.bio} 
        //     onChange={handleChanges} 
        //     placeholder='Bio' />
        //     <button 
        //     onClick={()=> props.submit(newMember) }>
        //         Search
        //     </button>
        // </div>

        <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="name" className="mr-sm-2">Name</Label>
          <Input type="text" name="name" value={newMember.name} onChange={handleChanges}  id="name" placeholder="Name" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="bio" className="mr-sm-2">Bio</Label>
          <Input type="text" name="bio" value={newMember.bio} onChange={handleChanges} id="bio" placeholder="Bio" />
        </FormGroup>
        <Button onClick={()=> props.submit(newMember) } >Submit</Button>
      </Form>
    )
}

export default MemberForm;