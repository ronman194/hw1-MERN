### HW1 MERN COURSE

- In this assignment, I have to create a basics REST API, based on Node.js and
Express.
- I also required to write a unit test for each API


## SCHEMA
- Post Schema     
{
message: String,
sender: String
}

## API
- GETL ALL POSTS - This API return all the posts in the DB
 GET http://localhost:3000/post
-  GETL POSTS BY SENDER - This API retunr all the posts in the DB that send by this sender ID
 GET http://localhost:3000/post?sender={senderID}
-  GET POSTS BY ID - This API return post by ID
 GET http://localhost:3000/post/{postID}
-  ADD NEW POST - This API create a new post
POST http://localhost:3000/post
add request body to the request {
"message": "YOUR MESSAGE",
"sender": "senderID"
}
-  UPDATE POST BY ID - This API update post by id
PUT http://localhost:3000/post/{postID}
add request body to the request {
"message": "YOUR NEW MESSAGE",
}

## HOW TO RUN THIS PROJECT
1. Download zip of the code from github.
2. Extract the zip to a new folder.
3. Add .env file that include the following variables: 
 - PORT = 3000
 - DB_URL = ENTER YOUR MONGODB URL
4. Open cmd in the directory root.
5. Run "npm i"to install packages
6. Run "npm start" to run the code / run "npm run test" to run the unit tests

## TOOLS
- MongoDB
- Express
- nodeJS
- JEST (Unit tests)
- Supertest
