const express = require('express');
const db = require('./data/db');
const server = express();
const port = 8000;
server.use(express.json());
server.use((req, res, next) => {
  console.log(req.url, req.body);
  next();
});
server.get('/', (req, res)=>{
  console.log('Hello')
  res.send('Hello')
})
server.post('/api/users', (req, res) => {
  db.insert(req.body).then(id => {
    res.send(id);
  });
});
server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.send(users);
  });
});
server.get('/api/users/:id', (req, res) => {
  db.findById(req.params.id).then(user => {
    res.send(user);
  });
});
server.delete('/api/users/:id', (req, res) => {
  db.remove(req.params.id).then(count => {
    res.status(200).send(`Removed ${count} user(s).`)
  });
});
server.put('/api/users/:id', (req, res) => {
  db.update(req.params.id, req.body).then(count => {
    res.send(`Made ${count} change(s).`);
  });
});

server.listen(port, () => {
  console.log(`\n Running on port ${port} \n`);
});