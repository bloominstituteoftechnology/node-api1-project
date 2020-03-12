import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const UserCard = ({ name, bio }) => (
  <Card>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Description>{bio}</Card.Description>
    </Card.Content>
  </Card>
);

export default UserCard;
