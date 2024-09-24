# Components

In order to decide which technologies I was going to use, I compared several techological solutions:

## Frameworks

### Express.JS

- :white_check_mark: A framework that has been around for a long time in the programming world
- :white_check_mark: Because of its age, it's alreay been battle-tested
- :x: Compared to more modern offerings, it is a [lot slower then the competition](https://fastify.dev/benchmarks/) 
- :x: It doesn't have native Typescript support and needs types from a third party *(A.K.A from [DefinitlyTyped](https://www.npmjs.com/package/@types/express))*
- :x: While Express has middleware, it missed the plugin-based ecosystem found in [Fastify](https://fastify.dev/ecosystem/) and [Hapi](https://hapi.dev/plugins/)

### Koa

- :white_check_mark: Newer and faster then Express.JS
- :x: It doesn't have native Typescript support and needs types from a third party *(A.K.A from [DefinitlyTyped](https://www.npmjs.com/package/@types/koa))*
- :x: Has no build-in plugin support
- :x: Fastify is much younger then Express.JS

### Hapi

- :white_check_mark: Newer and faster then Express.JS
- :white_check_mark: Has [build-in plugin support](https://hapi.dev/plugins/)
- :x: It doesn't have native Typescript support and needs types from a third party *(A.K.A from [DefinitlyTyped](https://www.npmjs.com/package/@types/hapi))*
- :x: Fastify is much younger then Express.JS

### Nest.JS

- :white_check_mark: Extensive, microservice-oriented framework
- :white_check_mark: A lot of integrations for databases, testing, documentation, etc...
- :white_check_mark: Integration for diffent types of API communication *(REST, GraphQL, gRPC)*
- :x: Very verbosed and opinionated, which results in a steeper learning curve for people who aren't familiar with it
> This framework might also just be overkill for this test

### Fastify

- :white_check_mark: Newer and faster then Express.JS
- :white_check_mark: Has [build-in plugin support](https://fastify.dev/ecosystem/)
- :white_check_mark: Fastify is shipped with a typing file, which improves Typescrip support
- :x: Fastify is much younger then Express.JS

---
The preferred solution in this case will be **Fastify** because of its Typescript support, performance and unopinionated nature.

## Databases

### MongoDB

- :white_check_mark: Has a flexible data structure and document-based model written in JSON, which makes it more human-readable
- :white_check_mark: Can accept a wide array of data structures compared to a traditional database *(Arrays, objects, geopoints, etc...)*
- :white_check_mark: Has build-in sharding support and results in being very scalable
- :white_check_mark: Allows for data aggregation pipelines, which are executed on the database servers and can be optimized by the database itself
- :x: Because of the different way of structuring data and the flexible data model, it has a high learning curve for data modeling
- :x: Aggregation pipelines and query languages are not traditional SQL, but Javascript and JSON-based, which results in a higher learning curve

### Redis / Valkey

- :white_check_mark: In-memory database, so it's performance is very fast
- :x: In-memory database, so the cost associated might be higher then then other databases

# Architectures

Architectures can be viewed in the [Architectures documentation page](./2-architectures.md)