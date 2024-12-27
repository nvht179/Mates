const router = require("express").Router();
const ReactionController = require("../controllers/reaction.controller");
const verifyToken = require("../middleware/verifyToken.middleware");

router.use(verifyToken);
// Route to create a new reaction
router.post("/create", ReactionController.createReaction);

// Route to get all reactions for a specific post by its ID
router.get("/postId=:postId", ReactionController.getReactionsByPostId);

// Route to delete a reaction by its ID
router.delete("/delete", ReactionController.deleteReaction);

// Route to update a reaction by its ID
router.put("/update", ReactionController.updateReaction);

module.exports = router;