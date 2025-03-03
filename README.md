# Gadget API Development Challenge

- Tech Stack used :
    - TypeScript
    - Prisma ORM
    - PostgreSQL
    - JWT 

- Endpoints are divided into 2 :
    - User:
        - ```/auth/signup``` : Method ```POST```

      ![image](https://github.com/user-attachments/assets/067e0a82-fae9-422d-bbbc-068a62b69612)

        - ```/auth/signin``` : Method ```GET```
     
          ![image](https://github.com/user-attachments/assets/7d882d04-7aaf-4e07-bcf2-bf8e7499abb3)


    - Gadgets:
        - ```/gadgets``` : Method ```GET```
 
          ![image](https://github.com/user-attachments/assets/f699c09e-bfe2-45e3-bda8-9ea6ef52ce8a)

        - ```/gadgets?status={status}``` : Method ```GET```
 
          ![image](https://github.com/user-attachments/assets/85be8b25-ced7-4382-ba0a-65dbbe0d1125)

        - ```/gadgets``` : Method ```POST```  Auto generate Gadget
 
          ![image](https://github.com/user-attachments/assets/1aa9b8e9-164f-4ed7-98e9-630f492b0431)

        - ```/gadgets/:id``` : Method ```PUT```
 
          ![image](https://github.com/user-attachments/assets/b527b514-5ed0-4b37-9ac1-3909f032dd78)

        - ```/gadgets/:id``` : Method ```DELETE```
 
          ![image](https://github.com/user-attachments/assets/5a185f40-b5e5-4948-b7f9-7835ee57f8e2)

        - ```/gadgets/:id/self-destruct``` : Method ```GET```
 
         ![image](https://github.com/user-attachments/assets/cc2ed35c-b216-472f-8b62-5b3ff6efd3a0)

        - ```/gadgets/:id/self-destruct``` : Method ```POST```

          ![image](https://github.com/user-attachments/assets/6365fbf6-aa74-47fd-b9a8-4a5ec7a7463f)


