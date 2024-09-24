# Endpoints

## Purpose

From reading through the assignment, I concluded that there needs to be **3** endpoints within the applications

- An endpoint that returns the companies based on their popularity within the application
    > :exclamation: The popularity is based on the **unique** visits of every user in a 24h span.
- An endpoint that allows me to log the visits that a company recieves from their users
- An endpoint that returns the 100 lasts visits of an user relating to the companies
    > :question: Within the assigment, there is no info that indicates that this list should only consist of distinct companies or not.
    
    > In order to retain data integrity and should an accurate log of the visits, we'll assume that duplicate visits are allowed for this endpoint

## Structure

The endpoint should be structured in the following way:
```
.
├── /feed -> [GET] Shows the most popular companies in descending order
├── /users
│   └── /{userID}
│       └── /visits -> [GET] Shows the latest 100 visits
└── /companies
    └── /{companyId}
        └── /visit -> [POST] Save a visit for the company
```

This makes the most logical sense because of the following reasons:

- `/feed` doesn't really relate to a singular company or users, instead it aggreatates all of that information, so it would be sensible to place this under a `users` or `companies` path
- The 100 last visited companies is directly related to the user, as it needs to be on a user-basis, so the best way to handle this is to create a dynamic route by using the user's `uuid`, map it under the `/users` path and use that information to fetch the companies
- Logging a visit is directly related to a company and is on a company basis. Because of this, it makes sense to create a dynamic path by using the company `uuid`, map this under the companies path and use the `uuid` to complete the operation

This structure also allows for [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) compliance, which makes it easier to understand how the application works. Let's say we continue building out this application, we can show which actions can be taken by detailing them in the `GET /companies/{companyId}` call:
```json
GET /companies/01922398-d70d-7e0f-9e6d-2c981c2c2231

{
    "company": {
        "name": StarApps,
        "location": Ghent
    },
    "links": {
        "visit": "/companies/01922398-d70d-7e0f-9e6d-2c981c2c2231/visit"
    }
}
```
This will not be implemented for the test, but is something that is kept in mind while building the endpoints
