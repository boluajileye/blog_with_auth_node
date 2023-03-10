# Blog with AAuthentication Using Adonis Js


> **Steps to Use** 
1. Clone the Repository
2. CD into the desired project folder 
3. Install all projects dependencies using `npm install`..
4. Copy the content of `.env.example` and create a `.env`and paste the content
5. Run `node ace migration:run` to create database tables on the database
6. Start backend server locally.. `node ace serve --watch`. This should startup a local server @ `http://127.0.0.1:3333
> make sure MYSQL server has started locally before running the above commands.


# Endpoints.
### Register User

POST
```shell
http://127.0.0.1:3333/regsiter
```
PAYLOAD DATA

```shell
{
    "username": "testuser",
    "firstname": "testuser",
    "lastname": "testuser",
    "role_type": "user",
    "email": "test@gmail.com",
    "password": "password"
}
```

### Login User

POST
```shell
http://127.0.0.1:3333/login
```
PAYLOAD DATA

```shell
{
    "email": "test@gmail.com",
    "password": "password"
}
```

### Logout User

POST
```shell
http://127.0.0.1:3333/logout
```
### Get post by username

GET
```shell
http://127.0.0.1:3333/posts/:USERNAME
```
### Get all post

GET
```shell
http://127.0.0.1:3333/posts
```

### Get post by ID

GET
```shell
http://127.0.0.1:3333/posts/:ID
```

### Create Post

POST
```shell
http://127.0.0.1:3333/posts
```
PAYLOAD DATA

```shell
{
    "title": "First blog post",
    "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.."
}
```
### Update Post by post ID

PUT
```shell
http://127.0.0.1:3333/posts/:ID
```
PAYLOAD DATA

```shell
{
    "title": "First blog post",
    "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.."
}
```

### Delete Post by post ID

DELETE
```shell
http://127.0.0.1:3333/posts/:ID
```


> If an error occur while migrating, cross check the `**.env**`  file and make sure you passed the correct database informations
> Allow add bearer token for authentication after login

```