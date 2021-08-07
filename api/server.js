// BUILD YOUR SERVER HERE
// import express
const express = require( "express" );
const Users = require( "./users/model" );

// initiate express
const server = express();

// middleware
server.use( express.json() );

// ENDPOINTS
// GET /api/users (READ all users)
server.get( "/api/users", ( req, res ) => {
    Users.find()
        .then( users => res.status( 200 ).json( users ) )
        .catch( err => res.status( 500 ).json( { message: err.message } ) );
} );

// GET /api/users/:id (READ user by ID)
server.get( "/api/users/:id", ( req, res ) => {
    const { id } = req.params;
    Users.findById( id )
        .then( user => !user ? res.status( 404 ).json( {
            message: `User ${id} does not exist`
        } ) : res.json( user ) )
        .catch( err => res.status( 500 ).json( { message: err.message } ) );
} );

// POST /api/users (CREATE new user)
server.post( "/api/users", ( req, res ) => {
    const newUser = req.body;
    !newUser.name || !newUser.bio ?
        res.status( 422 ).json( { message: "Name and bio are required" } ) :
        Users.insert( newUser )
            .then( user => res.json( user ) )
            .catch( err => res.status( 500 ).json( { message: err.message } ) );
} );

// PUT /api/users/:id (UPDATE user by ID)
server.put( "/api/users/:id", async ( req, res ) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        if ( !changes.name || !changes.bio ) {
            res.status( 422 ).json( { message: "Name and bio are required" } );
        } else {
            const updatedUser = await Users.update( id, changes );
            if ( !updatedUser ) {
                res.status( 404 ).json( { message: "User does not exist" } );
            } else {
                res.status( 200 ).json( updatedUser );
            }
        }
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
} );

// DELETE /api/users/:id (DELETE user by ID)
server.delete( "/api/users/:id", async ( req, res ) => {
    try {
        const { id } = req.params;
        const deletedUser = await Users.remove( id );
        if ( !deletedUser ) {
            res.status( 404 ).json( { message: "User does not exist" } );
        } else {
            res.status( 201 ).json( deletedUser );
        }
    } catch ( err ) {
        res.status( 500 ).json( { message: err.message } );
    }
} );

// CATCH ALL
server.use( "*", ( req, res ) => {
    res.status( 404 ).json( { message: "Go eat a taco" } );
} );
module.exports = server; // EXPORT YOUR SERVER instead of {}
