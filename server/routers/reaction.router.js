const router = require("express").Router();
const ReactionController = require("../controllers/reaction.controller");

// Route to create a new reaction
router.post("/create", ReactionController.createReaction);

// Route to get all reactions for a specific post by its ID
router.get("/:postId", ReactionController.getReactionsByPostId);

// Route to delete a reaction by its ID
router.delete("/:id", ReactionController.deleteReaction);

// Route to update a reaction by its ID
router.put("/:id", ReactionController.updateReaction);

module.exports = router;