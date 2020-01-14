// implement your API here
const express = require ('express');

const  Database = require ('./data/db.js')

const server = express();

server.use(express.json());

server.get('/', function (request, res){
    res.send({ hello: 'dijah'})
})

const port = 9000;
server.listen(port, ()=> console.log (`\n ** api is showing on port:${port} ** \n`));


server.get('/apis/database', (req, res) =>{
    Database.find()
        .then(database => {
            res.status(200).json(database);
        })
        .catch(error =>{
            console.log(error);
            
            res.status(500).json({errorMessage: 'sorry, we ran into an error returning the list of data'})
        })
})

server.post('/apis/database', (req, res) =>{
    const Data = req.body;

    Database.insert(Data)
        .then(datas => {
            res.status(201).json(datas);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: 'sorry, we ran into an error creating the data'})
        })
        
})

server.put('/apis/database/:id', (req,res) =>{
    const id = req.params.id;
    const data = req.body

    Database.update(id, data)
            .then( updated => {
        res.status(200).json(updated);
     })

     .catch(error => {
         console.log(error);
         res.status(500).json({ errorMessage: 'sorry, we ran into an error editing the data'})
     })
})

server.delete('apis/database/:id', (req, res) => {
    const id =req.params.id;

    Database.remove(id) 
        .then (deleted => {
        
        res.status(200).json(deleted);
    })

        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: 'sorry, we ran into an error deleting the data'})
    })

})