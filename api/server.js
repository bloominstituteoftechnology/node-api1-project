// BUILD YOUR SERVER HERE
const express = require('express')

const Users = require('./users/model')

//Instance of Express App
const server = express()

server.get('./', (req,res)=>{
    console.log(`This is a ${req.method}`)
})
// POST   | /api/users     | Creates a user using the information sent inside the `request body`. 

server.post('/api/users', async (req, res) => {
    try {
        const {id, name, bio} = req.body;
        if (!name || !bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        }
    }
})

// | GET    | /api/users     | Returns an array users.                                                                                |

// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |


module.exports = server; // EXPORT YOUR SERVER instead of {}
