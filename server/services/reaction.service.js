const ReactionDB = require("../db/reaction.db");
const { ErrorHandler } = require("../helpers/error");

class ReactionService {
  async createReaction({ personId, postId, type }) {
    try {
      const newReaction = await ReactionDB.createReaction({ personId, postId, type });
      return newReaction;
    } catch (error) {
      throw new ErrorHandler(500, "Error in service layer while creating reaction", error);
    }
  }

  async getReactionsByPostId(postId) {
    try {
      const reactions = await ReactionDB.getReactionsByPostId(postId);
      return reactions;
    } catch (error) {
      throw new ErrorHandler(500, "Error in service layer while retrieving reactions", error);
    }
  }

  async deleteReaction(id) {
    try {
      const response = await ReactionDB.deleteReaction(id);
      return response;
    } catch (error) {
      throw new ErrorHandler(500, "Error in service layer while deleting reaction", error);
    }
  }

  async updateReaction({id, newType}) {
    try {
      const updatedReaction = await ReactionDB.updateReaction({id, newType});
      return updatedReaction;
    } catch (error) {
        console.log(error)

      throw new ErrorHandler(500, "Error in service layer while updating reaction", error);
    }
  }
  
}

module.exports = new ReactionService();