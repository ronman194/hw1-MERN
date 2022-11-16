const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Post = require('../models/post_model');

const postMessage = 'This is the new test post message for test';
const postSender = '11111';
let id = '';
const updateMessage = 'This is an update message';


beforeAll(async ()=>{
    await Post.remove();
});

afterAll(async ()=>{
    await Post.remove()
    mongoose.connection.close();
});

describe("Posts Tests", ()=>{


    test("Add new post",async ()=>{
        const response = await request(app).post('/post').send({
            "message": postMessage,
            "sender": postSender
        });
        id = response.body._id;
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(postMessage);
        expect(response.body.sender).toEqual(postSender);
        expect(id).not.toEqual(null);

    });

    test("Get all posts",async ()=>{
        const response = await request(app).get('/post');
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].message).toEqual(postMessage);
        expect(response.body[0].sender).toEqual(postSender);
    });

    test("Get all posts by sender",async ()=>{
        const response = await request(app).get('/post?sender='+postSender);
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].message).toEqual(postMessage);
        expect(response.body[0].sender).toEqual(postSender);
    });

    test("Get Post by Id", async () => {
        const response = await request(app).get('/post/' + id)
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(postMessage);
        expect(response.body.sender).toEqual(postSender);
        expect(response.body._id).toEqual(id);
    });

    test("Get Post by wrong Id", async () => {
        const response = await request(app).get('/post/' + 999999)
        expect(response.statusCode).toEqual(400);
    });

    test("Update Post by Id", async () => {
        const response = await request(app).put('/post/' + id).send({
            "message": updateMessage
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(updateMessage);
        expect(response.body.sender).toEqual(postSender);
        expect(response.body._id).toEqual(id);

        const response2 = await request(app).get('/post/' + id)
        expect(response2.statusCode).toEqual(200);
        expect(response2.body.message).toEqual(updateMessage);
        expect(response2.body.sender).toEqual(postSender);
        expect(response2.body._id).toEqual(id);
    });

    test("Update Post by Id with empty message", async () => {
        const response = await request(app).put('/post/' + id).send({
            "sender": "55555"
        });
        expect(response.statusCode).toEqual(400);
    });

    test("Update Post by Id with empty message", async () => {
        const response = await request(app).put('/post/0000').send({
            "message": updateMessage
        });
        expect(response.statusCode).toEqual(400);
    });

})
