const users = [
  { id: 1, name: "person1", bio: "Kinda Interesting" },
  { id: 2, name: "person2", bio: "Very Interesting" },
  { id: 3, name: "person3", bio: "Super duper interesting" },
];
function find(query = {}) {
  const { page = 1, limit = 100, sortBy = "id", sortDir = "asc" } = query;
  const offset = limit * (page - 1);

  return db("users")
    .orderBy(sortBy, sortDir)
    .limit(limit)
    .offset(offset)
    .select();
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function insert(newUser) {
  const [id] = await db("users").insert(newUser);
  return findById(id);
}

function remove(id) {
  return db("users").where({ id }).del();
}

async function update(id, changes) {
  await db("users").where({ id }).update(changes);

  return findById(id);
}

async function addUserBio(userId, bio) {
  const data = [
    { id: 1, name: "course1", bio: "Kinda Interesting" },
    { id: 2, name: "course2", bio: "Very Interesting" },
    { id: 3, name: "course3", bio: "Super duper interesting" },
  ];
  //   const data = { user_id: userId, ...bio };
  const [id] = await db("bio").insert(data);

  return findUserPostById(userId, id);
}

module.exports = {
  users,
  find,
  findById,
  insert,
  remove,
  update,
  addUserBio,
};
