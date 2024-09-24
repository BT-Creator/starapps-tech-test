# Database structure

The database structure inserted looks like this:

```mermaid
erDiagram
    Company {
        uuid id
        string name
    }
    User {
        uuid id
        string name
    }
    UserVisits {
        uuid id
        string dateTime
        string companyId
        string userId
    }
    Company ||--o{ UserVisits : "1-n"
    User ||--o{ UserVisits : "1-n"
```

The `UserVisits` contains the logged visits, where 1 entry references 1 `companyId` *(The target)*, `1 userId` *(The visitor)* and the `dateTime` *(The timestamp)* in order to be able to know when the user visited.
