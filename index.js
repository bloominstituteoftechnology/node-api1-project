// implement your API here
const express = require( 'express' );

const db = require( './data/db.js');

const server = express();

server.use( express.json() );

server.get( '/', ( req, res ) => {
  res.send( { api: 'up and running...' } );
} );

server.get( '/users', ( req, res ) => {
  db.find()
    .then( users => {
      res.status( 200 ).json( users );
    } )
    .catch( error => {
      console.log( 'error on GET /users', error );
      res.status( 500 ).json( { errorMessage: 'error getting list of users from database' } );
    } );
} );

server.get( '/users/:id', ( req, res ) => {
  const id = req.params.id;

  db.findById( id )
    .then( user => {
      if ( user.id == id ) {
        res.status( 200 ).json( user );
      } else {
        res.status( 404 ).json( { message: "The user with the specified ID does not exist." } )
      }
    } )
    .catch( error => {
      console.log( 'error on GET /users', error );
      res.status( 500 ).json( { errorMessage: 'error getting user info' } );
    } );
} );

server.post( '/users', ( req, res ) => {
  const userData = req.body;
  console.log( userData.bio );
  if ( userData.name === undefined || userData.bio === undefined ) {
    return res.status( 400 ).json( { errorMessage: "Please provide name and bio for the user." } );
  }
  db.insert( userData )
    .then( user => {
      res.status( 201 ).json( user );
    } )
    .catch( error => {
      console.log( 'error on POST /users', error );
      res.status( 500 ).json( { errorMessage: 'error adding the user' } );
    } );
} );

server.put( '/users/:id', ( req, res ) => {
  const userData = req.body;
  const id = req.params.id;

  console.log( userData.bio );
  if ( userData.name === undefined || userData.bio === undefined ) {
    return res.status( 400 ).json( { errorMessage: "Please provide name and bio for the user." } );
  }

  if ( id === 0 ) {
    return res.status( 400 ).json( { message: "The user with the specified ID does not exist." } );
  }
  
  db.update( id, userData )
    .then( user => {
      res.status( 201 ).json( user );
    } )
    .catch( error => {
      console.log( 'error on POST /users', error );
      res.status( 500 ).json( { errorMessage: 'error adding the user' } );
    } );
} );

server.delete( '/users/:id', (req, res) => {
  const id = req.params.id;

  db.remove( id )
    .then( removed => {
      if ( removed === 0 ) {
        res.status( 404 ).json( { message: "The user with the specified ID does not exist." } )
      } else {
        res.status( 200 ).json( { message: 'user removed succcessfully' } );
      }
    })
    .catch( error => {
      console.log( 'error on POST /users', error );
      res.status( 500 ).json( { errorMessage: 'error deleting user' } );
    } );
} );

server.put( '/users/:id', (req, res) => {
  const id = req.params.id;

  db.remove( id )
    .then( user => {
      if ( user === 0 ) {
        res.status( 400 ).json( { errorMessage: "The user with the specified ID does not exist." } )
      } else {
        res.status( 200 ).json( { message: 'user updated succcessfully' } );
      }
    })
    .catch( error => {
      console.log( 'error on POST /users', error );
      res.status( 500 ).json( { errorMessage: "The user information could not be modified." } );
    } );
} );

const port = 4000;

server.listen( port, () =>
  console.log( `\n ** API running on port ${port} **\n` )
);