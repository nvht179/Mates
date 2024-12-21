const ReactionService = require("../services/reaction.service");

class ReactionController {
  async createReaction(req, res) {
    try {
      const { personId, postId, type } = req.body;
      const newReaction = await ReactionService.createReaction({ personId, postId, type });
      res.status(200).json({newReaction});
    } catch (err) {
      res.status(403).json(err);
    }
  }

  async getReactionsByPostId(req, res) {
    try {
      const { postId } = req.params;
      const reactions = await ReactionService.getReactionsByPostId(postId);

      if (reactions.length === 0) {
        throw new ErrorHandler(403, "No reactions found for this post");
      }

      res.status(200).json({reactions});
    } catch (err) {
      res.status(403).json(err.message);
    }
  }

  async deleteReaction(req, res) {
    try {
      const { id } = req.body;
      const response = await ReactionService.deleteReaction(id);

      res.status(200).json(response);
    } catch (err) {
      res.status(403).json(err);
    }
  }

  // Phương thức cập nhật reaction
  async updateReaction(req, res) {
    try {
      const { id, newType } = req.body;
      const updatedReaction = await ReactionService.updateReaction({id, newType});

      res.status(200).json(updatedReaction);
    } catch (err) {
      res.status(403).json(err);
    }
  }
}

module.exports = new ReactionController();