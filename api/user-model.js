const userID  = require('shortid') 

let users = [
    {
        id: userID.generate(),
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
        created_at:" Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)", // Date, defaults to current date
        updated_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) "// Date, defaults to current date
      }
]


module.exports = {
    findAll(){
        // SELECT * FROM users
        return Promise.resolve(users)
    },


    create({ name,bio }){
        const newUser = {id:userID.generate(),name:name,bio:bio,
            created_at:Date(),updated_at:null};

        return Promise.resolve(newUser);
    }
}