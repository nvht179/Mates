const router = require("express").Router();
const PostController = require('../controllers/post.controller')

router.post("/create", PostController.addNewPost);

module.exports = router;
