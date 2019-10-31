import React from 'react'
import { Card } from 'semantic-ui-react'

const UserCard = props => {

  return (
    <Card
      header={props.name}
      description={props.bio}
    />
  )

}

export default UserCard