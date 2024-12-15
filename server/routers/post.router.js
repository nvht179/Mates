const router = require("express").Router();
const PostController = require('../controllers/post.controller')

router.post("/create", PostController.addNewPost);
router.get("/classId=:classId", PostController.getPostsByClassId);

module.exports = router;
