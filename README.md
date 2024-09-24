# Available Scripts

In the project directory, you can run:

## `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## `npm start`

For production mode

## `npm run test`

Run the test cases.

# Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).

# Using the API

## `GET /users/:userId/visits`
This endpoint returns the last 100 companies visited by a user.
In order to test the diffent cases, you can call the following URLs:

- `http://localhost:3000/users/4e02a2a0-a7c1-4ea6-9c4a-fc9c57d0e17f/visits` returns the visits of an **existing** user with visits
- `http://localhost:3000/users/9b410e5b-4e5d-479f-bcdd-6ceae338d5f0/visits` returns the visits of an **existing** user with **no** visits
- `http://localhost:3000/users/9b410e5b-4e5d-479f-bcdd-6ceae338f0/visits` sends a malformed UUID to the server
- `http://localhost:3000/users/01922545-cbc3-7978-a5fa-e783f82f05f1/visits` uses a non-existant UUID and sends this to the server
- `http://localhost:3000/users//visits` uses **no** UUID and sends it to the server