# Gadget API Development Challenge

- Tech Stack used :
    - TypeScript
    - Prisma ORM
    - PostgreSQL
    - JWT 

- Endpoints are divided into 2 :
    - User:
        - ```/auth/signup``` : Method ```POST```
        - ```/auth/signin``` : Method ```GET```

    - Gadgets:
        - ```/gadgets``` : Method ```GET```
        - ```/gadgets/?status={status}``` : Method ```GET```
        - ```/gadgets``` : Method ```POST```
        - ```/gadgets/:id``` : Method ```PUT```
        - ```/gadgets/:id``` : Method ```DELETE```
        - ```/gadgets/:id/self-destruct``` : Method ```GET```
        - ```/gadgets/:id/self-destruct``` : Method ```POST```

