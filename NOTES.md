install git ignore npx gitignore node
install package json npm init -y
install express and shortid npm i express shortid
npm install eslint --save-dev


## Unit 4 Backend
CRUD Applications & RESTful APIs

Objectives: To build a server using express; build endpoints, and have the user communicate and talk with the endpoints using data.

Preparing your server environment: 
After you have your repository set up and you’ve cd’d into the proper file in your git, it’s time to get your server environment set up, using these steps: 


Step 1: Create Gitignore file
In the git terminal type ‘npx gitignore node’ 
OR     -
      -	‘npm i -g gitignore’ then ‘ gitignore node ‘ 

*Both of these ways do the same, create a global gitignore file that prevents you from checking in certain files (in this case, the node modules in particular) and cluttering up your project.


Step 2: Create package.json file
In the git terminal type ‘npm init -y’ 
*The -y just default answers ‘yes’ to all the initializing questions.
Then go into your package.json file and delete everything underneath your ‘scripts’

Step 3: Install IDgenerator(shortid) & Express
	-In the git terminal type ‘npm i express shortid’
		-*The short id is what generates id’s for the data we make
		-*express is what supports our server

Step 4: Create Your Own Scripts (In the Package.json file)
	”scripts”:{
		“anything”: “node index.js”
}

-The above code, you’ve written your own script and named it whatever you want to (in this case I named mine ‘anything’ for the example), and then made it to run the index.js file.

-You can see this script work it’s magic by first typing a console.log(‘it works!’) in file(in this case, the index.js that we’re running with our script), and then going into the terminal and typing it to watch it run!
		- ‘npm run anything’
		
Step 5: Install nodemon 
In your terminal type ‘npm i nodemon -D’
* Nodemon is used to create the developer dependencies, which help with refreshing the browser page upon changes made by the developer; exclusively used during the developing process.
Step 6: Write your nodemon script (still in your package.json file)
‘anything’: ‘nodemon index.js’ 
-*Type this in the terminal to see the script run: 
	‘npm run anything’

Step 7: Import Express & ShortId in your server.js, using commonjs
const express = require(“express”);
const generate = require(“shortid”).generate;

*Using commonjs like this is the equivalent as importing in js.

Step 8: Create your server! (See the guided project)

***STEP 9: Also set up your eslint file: 
	-In your git terminal type ‘npx eslint --init’

	Check these answers to get your eslint set up properly: 
		-syntax and find problems
		-problems
		-commonjs
		-none
		-No
		-Browser(Green Check!)
		-Node (Green check!)
		-json
		
	-’npm install’
	-*You should then go into your package.json and make sure ‘node’: is ‘true’

## SERVER TEMPLATE

// Server Template
// IMPORTS AT THE TOP
const express = require("express")
const data = require("./users/data")
//const {findAll, findById, update} = require("./dog-model.js")
// INSTANCE OF EXPRESS APP
const server = express()
// GLOBAL MIDDLEWARE
server.use(express.json())
//Sanity Check
// [GET] / (Hello World endpoint)
server.use("*",(req,res)=>{
    console.log(data)
    res.status(200).json({message:"SERVER OPERATIONAL code: 200"})
})
// ENDPOINTS
// [GET] /api/data/:id (R of CRUD, fetch data by :id)
// [GET] /api/data (R of CRUD, fetch all data)
// [POST] /api/data (C of CRUD, create new data from JSON payload)
// [PUT] /api/data/:id (U of CRUD, update data with :id using JSON payload)
// [DELETE] /api/data/:id (D of CRUD, remove data with :id)
// [GET] / (Hello World endpoint)
module.exports = server;