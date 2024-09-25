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

## `POST /companies/:companyId/visit`

This endpoint insert a visit of an company by using a timestamp & userId
In order to test the diffent cases, you can call the following URLs with the appropriate body:

- `http://localhost:3000/companies/e26cdf18-f209-4acd-b9d4-e0bc904f7715/visit` with the following body will insert a company visit.
    ```json
    {
	    "userId": "4e02a2a0-a7c1-4ea6-9c4a-fc9c57d0e17f",
	    "timestamp": "2024-09-25T09:53:33+0000"
    }
    ```

- `http://localhost:3000/companies/e26cdf18-f209-4acd-b9d4-e0bc904f7715/visit` with the following body will try to insert a company visit, but with a non-existant userId.
    ```json
    {
        "userId": "ab188862-6383-40cd-8b00-63a9c1b9b83c",
	    "timestamp": "2024-09-25T09:53:33+0000"
    }
    ```

- `http://localhost:3000/companies/f117f1d1-2390-48ae-b4a4-7410214d90c3/visit` with the following body will try to insert a company visit, but with a non-existant companyId.
    ```json
    {
	    "userId": "4e02a2a0-a7c1-4ea6-9c4a-fc9c57d0e17f",
	    "timestamp": "2024-09-25T09:53:33+0000"
    }
    ```
- `http://localhost:3000/companies/e26cdf18-f209-4acd-b9d4-e0bc904f7715/visit` with the following body will try to insert a company visit, but with a dateTime in the future.
    ```json
    {
        "userId": "4e02a2a0-a7c1-4ea6-9c4a-fc9c57d0e17f",
        "timestamp": "2025-09-25T09:53:33+0000"
    }
    ```
- `http://localhost:3000/companies/e26cdf18-f209-4acd-b9d4-e0bc904f7715/visit` with the following body will try to insert a company visit, but with a invalid ISO 8601 string in timestamp.
    ```json
    {
	    "userId": "4e02a2a0-a7c1-4ea6-9c4a-fc9c57d0e17f",
	    "timestamp": "2025-09-25T09:53:33+00"
    }
    ```
- `http://localhost:3000/companies/e26cdf18-f209-4acd-b9d4-e0bc904f7715/visit` with the following body will try to insert a company visit, but with a invalid company or user id
    ```json
    {
        "userId": "4e02a2-a7c1-4ea6-9c4a-fc9c57d0e17f",
        "timestamp": "2024-09-25T09:53:33+00:00"
    }
    ```
- `http://localhost:3000/companies/e26cdf18-f209-4acd-b9d4-e0bc904f7715/visit` with the following body will try to insert a company visit, but with required body parameters missing
    ```json
    {
	"userId": "4e02a2-a7c1-4ea6-9c4a-fc9c57d0e17f"
    }