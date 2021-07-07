const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE

server.listen(port, ()=> {
    console.log('Server up, this is index.js')
})

// npm i -D nodemon | npm run server
    // (package.json  "server": "nodemon index.js")
// npx gitignore node
// npm i express shortid
// npx eslint --init 
//   https://youtu.be/sumpYnjzEew?t=1639
// python -m pip install --upgrade pip setuptools
// python -m pip install --upgrade httpie
// npm start
// http get :5000/hello --verbose
// http get :5000/api/users/model --verbose

// notes:
// ctr + c, to kill nodemon
// wip ctr + enter, commits
// ctrl + shift + k, clears hyper terminal
// arrow key up, last terminal command
// npm start, must be up to test postman & co