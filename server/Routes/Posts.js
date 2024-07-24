const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

// Get all posts
router.get("/", async (req, res) => {
    try {
        const listofPosts = await Posts.findAll();
        res.json(listofPosts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

//Get Post by Id
router.get("/byId/:id", async(req,res) => {
    const id    = req.params.id;
    const post  = await Posts.findByPk(id);
    res.json(post);
});

// Create a new post
router.post("/", async (req, res) => {
    try {
        const { title, postText, username } = req.body;

        // Check if all required fields are provided
        if (!title || !postText || !username) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate data types
        if (typeof title !== 'string') {
            throw new Error('Title must be a string');
        }
        if (typeof postText !== 'string') {
            throw new Error('Post text must be a string');
        }
        if (typeof username !== 'string') {
            throw new Error('Username must be a string');
        }

        // Create the new post
        const post = await Posts.create({ title, postText, username });
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
