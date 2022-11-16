const Post = require('../models/post_model')

const getAllPosts = async (req, res, next) => {
    try {
        const sender = req.query.sender;
        var posts;
        if (sender != null | sender != undefined) {
            posts = await Post.find({ 'sender': sender });
        } else {
            posts = await Post.find();
        }
        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'err': err.message
        });
    }
}


const getPostById = async (req, res, next) => {
    console.log('Get post by id: ' + req.params.id);
    const id = req.params.id;
    if (id == null | id == undefined) {
        return res.status(400).send({ 'err': 'no id provided' });
    }
    try {
        const post = await Post.findById(id);
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'err': err.message
        });
    }
}
const updatePostById = async (req, res, next) => {
    console.log('Update post by id: ' + req.params.id);
    const id = req.params.id;
    if (id == null | id == undefined) {
        return res.status(400).send({ 'err': 'no id provided' });
    }
    const updateMessage = req.body.message;
    if (updateMessage == null | updateMessage == undefined) {
        return res.status(400).send({ 'err': 'no message provided' });
    }
    try {
        await Post.findByIdAndUpdate(id, { message: updateMessage });
        const post = await Post.findById(id);
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'err': err.message
        });
    }
}

const addNewPost = async (req, res, next) => {
    console.log(req.body);

    const post = Post({
        message: req.body.message,
        sender: req.body.sender,
    })

    try {
        const newPost = await post.save();
        res.status(200).send(newPost);

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'err': err.message
        });
    }

}

module.exports = { getAllPosts, addNewPost, getPostById, updatePostById }