## Blog Post system using expressjs and GraphQL

### Available Scripts

```
$ npm install
```
Downloads a package and it's dependencies

### To Run Server In Local

```
$ npm start
```

Runs the server in the local machine

### For Testing Using Cypress

```
$ npm cypress:open
```

#### To Run all GraphQL queries and mutations in GraphiQL

After start of Local server , You can open Graphiql 
[Link to Graphiql](http://localhost:8000/graphql)

### For Dockerize the Container

```
$ Docker build -t graphql .
```
To run docker image 
```
$ sudo docker run -p 8000:8000 graphql
```

