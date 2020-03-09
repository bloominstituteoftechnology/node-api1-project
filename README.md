# Node API 1 Project Starter Code

## Topics

- Building a RESTful API.
- Performing CRUD operations.
- Writing API endpoints.

### Grab Starter Code

- **Fork** and **Clone** this repository.
- **CD into the folder** where you cloned the repository.

## Assignment

Use Node.js and Express to build an API that performs CRUD operations on users.

- Add a `.gitignore` file appropriate for `node.js` projects.
- Add a new `package.json`.
- Add a `server` script to `package.json` that runs the API using `nodemon`.

### Write endpoints

Add the code necessary to create a Web API and implement the following _endpoints_:

| Method | URL            | Description                                                                                            |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
| POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
| GET    | /api/users     | Returns an array users.                                                                                |
| GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
| PATCH  | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

#### User Schema

Each User _resource_ should conform to the following structure (AKA schema):

```js
{
  id: "a_unique_id", // hint: use the shortid npm package to generate it
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String, required
}
```

#### Endpoint Specifications

When the client makes a `POST` request to `/api/users`:

- If the request body is missing the `name` or `bio` property:

  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

- If the information about the _user_ is valid:

  - save the new _user_ the the database.
  - respond with HTTP status code `201` (Created).
  - return the newly created _user document_.

- If there's an error while saving the _user_:
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ errorMessage: "There was an error while saving the user to the database" }`.

When the client makes a `GET` request to `/api/users`:

- If there's an error in retrieving the _users_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ errorMessage: "The users information could not be retrieved." }`.

When the client makes a `GET` request to `/api/users/:id`:

- If the _user_ with the specified `id` is not found:

  - respond with HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

- If there's an error in retrieving the _user_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ errorMessage: "The user information could not be retrieved." }`.

When the client makes a `DELETE` request to `/api/users/:id`:

- If the _user_ with the specified `id` is not found:

  - respond with HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

- If there's an error in removing the _user_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ errorMessage: "The user could not be removed" }`.

When the client makes a `PUT` request to `/api/users/:id`:

- If the _user_ with the specified `id` is not found:

  - respond with HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

- If the request body is missing the `name` or `bio` property:

  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

- If there's an error when updating the _user_:

  - respond with HTTP status code `500`.
  - return the following JSON object: `{ errorMessage: "The user information could not be modified." }`.

- If the user is found and the new information is valid:

  - update the user document in the database using the new information sent in the `request body`.
  - respond with HTTP status code `200` (OK).
  - return the newly updated _user document_.

## Stretch Problems

To work on the stretch problems you'll need to enable the `cors` middleware. Follow these steps:

- add the `cors` npm module: `npm i cors`.
- add `server.use(cors())` after `server.use(express.json())`.

Create a new React application and connect it to your server:

- the React application can be anywhere, but, for this project create it inside the folder for the solution.
- connect to the `/api/users` endpoint in the API and show the list of users.
- add a delete button to each displayed user that will remove it from the server.
- add forms to add and update data.
- Style the list of users however you see fit.
