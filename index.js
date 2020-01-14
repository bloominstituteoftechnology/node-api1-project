// implement your API here
const express = require( 'express' );
const server = express();
const Db = require( './data/db' );
server.use( express.json() );


server.get( '/', function ( request, response )
{
    response.send( { name: "Wais Almakaleh" } );
}

);


server.get('/api/db', (req, res)=> {
    Db.find().then(db => {
        console.log(res)
        res.status(200).json(db)
    })
})


const port = 8000;
server.listen( port, () => console.log( `\n ** api on port: ${ port } ** \n` ) );

