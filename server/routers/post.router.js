const router = require("express").Router();
const PostController = require('../controllers/post.controller')
const upload = require("../middleware/upload.middleware");
const verifyToken = require("../middleware/verifyToken.middleware");

router.use(verifyToken);
router.post("/create",upload ,PostController.addNewPost);
router.put("/edit/", upload ,PostController.editPost); // Edit an existing post
router.delete("/remove/:postId", PostController.removePost); // Remove a post
// GET method với URL parameters
router.get("/classID/:classID", PostController.getPostsByClassId);
module.exports = router;
