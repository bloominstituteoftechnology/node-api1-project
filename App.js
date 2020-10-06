// const http = require("http");

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("I am a potato");
// });

// server.listen(port, hostname, () => {
//   console.log(`server listening on http://${hostname}:${port}`);
// });

// server.put("/students/:id", (req, res) => {
//   const changes = req.______;                   // req.body
//   const id = req.______.id;                             // req.params.id
//   Students.update(id, changes)
//       .then(student => {
//           res.status(200).json({ data: student });
//       })
//       .catch(error  => {
//           res.status(500).json({ message: error.message });
//       });
// });

// server.post("/students", (req, res) => {
//   Students.add(req.body)
//       .then(student => {
//           res.status(___).json({ data: student });           // 201 success creating (it's a post)
//       })
//       .catch(error => {
//           res.status(___).json({ message: error.message });   // 500 internal error is default
//       });
// });

// C for Create: HTTP POST
// R for Read: HTTP GET
// U for Update: HTTP PUT
// D for Delete: HTTP DELETE

// app.get('/users', (req, res) => {
//   return res.send('GET HTTP method on user resource');
// });

// app.post('/users', (req, res) => {
//   return res.send('POST HTTP method on user resource');
// });

// app.put('/users/:userId', (req, res) => {
//   return res.send(
//     `PUT HTTP method on user/${req.params.userId} resource`,
//   );
// });

// app.delete('/users/:userId', (req, res) => {
//   return res.send(
//     `DELETE HTTP method on user/${req.params.userId} resource`,
//   );
// });
