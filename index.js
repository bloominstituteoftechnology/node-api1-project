// implement your API here
const express = require( 'express' );
const Db = require( './data/db' );
const server = express();
server.use( express.json() );


server.get( '/', function ( request, response )
{
    response.send( { name: "Wais Almakaleh" } );
}

);


server.get( '/api/db', ( req, res ) =>
{

    Db.find().then( db =>
    {
        // console.log( db );
        res.status( 200 ).json( db );
    } ).catch( error =>
    {
        console.log( error );
        res.status( 500 ).json( {
            errorMessage: 'sorry, we ran into an error getting the list of hubs',
        } );
    } );


} );


server.get( '/api/users/:id', ( req, res ) =>
{

    const id = req.params.id;
    Db.findById( id )
        .then( users =>
        {

            res.status( 200 ).json( users );
        } ).catch( error =>
        {
            console.log( error );
            res.status( 404 ).json( { ErrorMessage: "can not find by ID" } );
        } );

} );


const port = 8000;
server.listen( port, () => console.log( `\n ** api on port: ${ port } ** \n` ) );

