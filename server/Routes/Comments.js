const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middleware/AuthMiddleware.JS');

//Get Comments by PostId
router.get("/:postId", async(req,res) => {
    const postId    = req.params.postId;
    const comments  = await Comments.findAll({ where: { PostId:postId } });
    res.json(comments);
});

//Post Comment
router.post("/", validateToken, async(req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
})

module.exports = router;