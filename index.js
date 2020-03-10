// we will write our API with Express (barebones lib for building web servers - Sinatra)
// STEP 1, install express
// STEP 2, import express, commonjs syntax instead of native ES modules
const express = require("express");
// STEP 3 instantiate app
const app = express();
// STEP 4 "turn on" the ability of the app to read req.body as json
app.use(express.json());
// STEP 5 decide a port number
const PORT = 3333;
// STEP 6 make an endpoint on "/hello" [GET] that sends back a json { "message": "hello" }
app.get(
  "/",
  (
    req, // req is the "objectified" version of the actual http request (piece of paper with 3 parts...)
    res // res is the toolbox that allows to shape a response and send it back to the client
  ) => {
    // set a success code of 200
    // send back a json response
    console.log();

    res.status(200).json({ message: "I love you " });
  }
);
// STEP 7 make the express app listen on PORT
app.listen(PORT, () => {
  console.log(`Great! Listening on ${PORT}`);
});
