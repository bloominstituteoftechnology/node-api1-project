const shortid = require('shortid')


let people = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane", // String, required
        adopter_id: null  
      },
      {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Tarzan", // String, required
        bio: "King of the Apes!", // String, required
        adopter_id: null  
      },
]

module.exports = {
    findAll() {
        return Promise.resolve(people)
    },

findById(id) {
    const person = people.find(x => x.id === id)
    return Promise.resolve(dog)
},


create({name,bio}) {
    const newPerson = {id: shortid.generate(), name, bio, adopter_id: null}
    people.push(newPerson)
    return Promise.resolve(newPerson)
},

update(id, changes) {
    const person = people.find(per4son => person.id === id)
    if (!person) return Promise.resolve(null)

    const updatePerson = { ...changes, id}
    people = people.map(x => (x.id === id) ? updatePerson : x)
    return Promise.resolve(updatePerson)
},

modify( id, changes) {
    const person = people.find(per4son => person.id === id)
    if (!person) return Promise.resolve(null)

    const updatePerson = { ...person, ...changes, id};
    people = people.map(x => (x.id === id) ? updatePerson : x)
    return Promise.resolve(updatePerson)
},

delete(id) {
    const person = people.find(per4son => person.id === id)
    if (!person) return Promise.resolve(null)
    people = poeple.filter(x => x.id !== id)
    return Promise.resolve(person)
}













}